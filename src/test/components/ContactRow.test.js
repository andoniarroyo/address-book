// external modules
import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
// internal modules
import ContactRow from '../../main/components/ContactRow';
import { createContact } from '../../main/model/contact';
import staticRouterWrapper from '../utils/staticRouterWrapper';

describe('<ContactRow />', () => {
  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });
  const createProps = () => (
    {
      contact: createContact({
        id: '1', firstName: 'Andoni', lastName: 'Arroyo', email: 'andoni.arroyo@gmail.com', countryCode: 'GB',
      }),
      removeContact: jest.fn(),
    }
  );
  describe('checking the layout', () => {
    it('renders the component', () => {
      const props = createProps();
      const tree = renderer.create(staticRouterWrapper(<ContactRow {...props} />)).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('checking the behaviour', () => {
    it('ask to remove the contact when the remove button is clicked', () => {
      const props = createProps();
      const wrapper = mount(staticRouterWrapper(<ContactRow {...props} />));
      wrapper.find('#remove-button').simulate('click');
      expect(props.removeContact).toBeCalledWith(props.contact.id);
    });
  });
});
