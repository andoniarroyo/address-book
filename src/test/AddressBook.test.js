// external modules
import React from 'react';
import renderer from 'react-test-renderer';
// internal modules
import { createContact } from '../main/model/contact';
import { removeContact } from '../main/actions';
import AddressBook from '../main/AddressBook';
import staticRouterWrapper from './utils/staticRouterWrapper';

describe('<AddressBook />', () => {
  it('renders the component', () => {
    const props = {
      contactList: [
        createContact({
          id: '1', firstName: 'Andoni', lastName: 'Arroyo', email: 'andoni.arroyo@gmail.com', countryCode: 'GB',
        }),
        createContact({
          id: '2', firstName: 'Naiara', lastName: 'Saratxaga', email: 'nsaratx@gmail.com', countryCode: 'ES',
        }),
      ],
      removeContact,
    };

    const tree = renderer.create(staticRouterWrapper(<AddressBook {...props} />)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
