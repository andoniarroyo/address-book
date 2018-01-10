// @flow
// external modules
import React from 'react';
import { Link } from 'react-router-dom';
// internal types
import type { ContactListType, ContactType } from './index';
import type { RemoveContactActionFactoryType } from './actions';
// internal modules
import ContactRow from './components/ContactRow';
import EmptyContact from './components/EmptyContacts';
// styles
import './styles/addressBook.scss';

export type AddressBookPropsType = {
  contactList: ContactListType,
  removeContact: RemoveContactActionFactoryType,
};

/**
 * The contact rows render method
 * @param {ContactListType} contactList The list of contacts to be rendered
 * @param {RemoveContactActionFactoryType} removeContact The remove contact action factory
 * @returns {React$Element<any>} HTML markup for the list of contacts
 * @private
 */
const renderContacts = (contactList: ContactListType, removeContact: RemoveContactActionFactoryType)
: Array<React.Element<*>> => (
  contactList.map((contact: ContactType): React.Element<*> => (
    <ContactRow key={contact.id} contact={contact} removeContact={removeContact} />
  ))
);

/**
 * The adress book render method
 * @param {AddressBookPropsType} props The properties to render the object
 * @returns {React$Element<any>} HTML markup for the component
 * @public
 */
const AddressBook = ({ contactList, removeContact }: AddressBookPropsType): React.Element<*> => {
  const contacts = (!contactList.length) ? <EmptyContact /> : renderContacts(contactList, removeContact);
  return (
    <main>
      <header>
        <h3>Address book</h3>
        <Link to="/add">
            Create a new contact
        </Link>
      </header>
      <section className="contact-list">
        {contacts}
      </section>
    </main>
  );
};

export default AddressBook;
