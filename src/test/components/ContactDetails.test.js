// external modules
import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
// internal modules
import ContactDetails from '../../main/components/ContactDetails';
import { createContact } from '../../main/model/contact';
import staticRouterWrapper from '../utils/staticRouterWrapper';

describe('<ContactDetails />', () => {
  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });
  const createProps = (id, contact) => ({
    getContact: jest.fn(() => contact),
    addContact: jest.fn(),
    updateContact: jest.fn(),
    match: {
      params: {
        id,
      },
    },
    history: [],
  });
  describe('adding a new contact', () => {
    describe('checking the layout', () => {
      it('renders the component in add mode', () => {
        const props = createProps();

        const tree = renderer.create(staticRouterWrapper(<ContactDetails {...props} />)).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
    describe('checking the behaviour', () => {
      it('updates the model when the UI changes asking to add the new contact when action is required', () => {
        const props = createProps();

        const wrapper = mount(staticRouterWrapper(<ContactDetails {...props} />));
        // updates the model until it is valid
        wrapper.find('#firstName').simulate('change', { target: { name: 'firstName', value: 'Andoni' } });
        wrapper.find('#lastName').simulate('change', { target: { name: 'lastName', value: 'Arroyo' } });
        wrapper.find('#email').simulate('change', { target: { name: 'email', value: 'andoni.arroyo@gmail.com' } });
        wrapper.find('#countryCode').simulate('change', { target: { name: 'countryCode', value: 'GB' } });
        // ask for the action
        wrapper.find('#submit-button').simulate('click');
        expect(props.addContact).toBeCalled();
      });
    });
  });
  describe('editing an existing contact', () => {
    describe('checking the layout', () => {
      it('renders the component in edition mode', () => {
        const props = createProps('1', createContact({
          id: '1', firstName: 'Andoni', lastName: 'Arroyo', email: 'andoni.arroyo@gmail.com', countryCode: 'es',
        }));

        const tree = renderer.create(staticRouterWrapper(<ContactDetails {...props} />)).toJSON();
        expect(props.getContact).toBeCalledWith(props.match.params.id);
        expect(tree).toMatchSnapshot();
      });
      it('navigates to invalid if the contact to be edited is not in the state', () => {
        const expectedRoute = '/invalid';
        const props = createProps('1');

        const tree = renderer.create(staticRouterWrapper(<ContactDetails {...props} />)).toJSON();
        expect(props.history[0]).toBe(expectedRoute);
        expect(tree).toMatchSnapshot();
      });
    });
    describe('checking the behaviour', () => {
      it('ask to update the contact when action is required', () => {
        const editingContact = {
          id: '1', firstName: 'Andoni', lastName: 'Arroyo', email: 'andoni.arroyo@gmail.com', countryCode: 'GB',
        };
        const props = createProps('1', editingContact);

        const wrapper = mount(staticRouterWrapper(<ContactDetails {...props} />));
        wrapper.find('#submit-button').simulate('click');
        expect(props.updateContact).toBeCalledWith(editingContact);
      });
    });
  });
});
