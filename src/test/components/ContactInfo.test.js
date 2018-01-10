// external modules
import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
// internal modules
import ContactInfo from '../../main/components/ContactInfo';
import { createContact } from '../../main/model/contact';

describe('<ContactInfo />', () => {
  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });
  const createProps = isValidToSubmit => (
    {
      contact: createContact({
        id: '1', firstName: 'Andoni', lastName: 'Arroyo', email: 'andoni.arroyo@gmail.com', countryCode: 'GB',
      }),
      onSubmit: jest.fn(),
      onFieldChanged: jest.fn(),
      isValidToSubmit,
    }
  );
  describe('checking the layout', () => {
    it('renders the component', () => {
      const props = createProps(true);
      const tree = renderer.create(<ContactInfo {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('checking the behaviour', () => {
    it('ask to submit the form the submit button is clicked and the isValidToSubmit is true ', () => {
      const props = createProps(true);
      const wrapper = mount(<ContactInfo {...props} />);

      wrapper.find('#submit-button').simulate('click');
      expect(props.onSubmit).toBeCalled();
    });
    it('does not ask to submit the form the submit button is clicked and the isValidToSubmit is false ', () => {
      const props = createProps(false);
      const wrapper = mount(<ContactInfo {...props} />);

      wrapper.find('#submit-button').simulate('click');
      expect(props.onSubmit).not.toBeCalled();
    });
    it('ask to update the value of the field when the UI component is changed', () => {
      const props = createProps(false);
      const wrapper = mount(<ContactInfo {...props} />);

      wrapper.find('#firstName').simulate('change', { target: { value: 'Naiara' } });
      expect(props.onFieldChanged).toBeCalled();
    });
  });
});
