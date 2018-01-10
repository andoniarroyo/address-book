// @flow
// internal types
import type {
  CommonActionType,
  AddContactActionType,
  RemoveContactActionType,
  UpdateContactActionType,
} from './actions';
import type { ContactListType, ContactType } from './index';
// internal modules
import { CONTACT_ADDED, CONTACT_REMOVED, CONTACT_UPDATED } from './constants';

/**
 * Sorts the incoming contact list based on the last name values
 * @param {ContactListType} contactList The list to be sorted
 * @returns {ContactListType} The ordered list
 * @private
 */
const sortContactList = (contactList: ContactListType): ContactListType => (
  contactList.sort((contact1: ContactType, contact2:ContactType): number => (
    contact1.lastName.toLowerCase().localeCompare(contact2.lastName.toLowerCase())
  ))
);

/**
 * Adds a contact to the end of the contact list
 * @param {ContactListType} contactList The contact list to add the contact
 * @param {ContactType} newContact The new contact to be added
 * @returns {ContactListType} The new generated contact list, including the new contact
 * @private
 */
const addContact = (contactList: ContactListType, newContact: ContactType): ContactListType => (
  contactList.concat([newContact])
);

/**
 * Removes the contact from the contact list (if it exists)
 * @param {ContactListType} contactList The contact list to be removed the contact from
 * @param {string} contactID The identifier of the contact to be removed
 * @returns {ContactListType} The new generated contact list, removing the contact
 * @private
 */
const removeContact = (contactList: ContactListType, contactID: string): ContactListType => (
  contactList.filter((contact: ContactType): boolean => contact.id !== contactID)
);

/**
 * Updates the contact from the contact list (if it exists)
 * @param {ContactListType} contactList The contact list to be removed the contact from
 * @param {ContactType} updatedContact The modified contact with the updated information
 * @returns {ContactListType} The new generated contact list, updating the contact
 * @private
 */
const updateContact = (contactList: ContactListType, updatedContact: ContactType): ContactListType => (
  contactList.map((contact: ContactType): ContactType => (contact.id === updatedContact.id ? updatedContact : contact))
);

/**
 * Reduces the contact list adding a new contact
 * @param {ContactListType} contactList The current contact list
 * @param {AddContactActionType} action The add contact action
 * @returns {ContactListType} The new contact list including the new contact
 * @private
 */
const contactAddedReducer = (contactList: ContactListType = [], action: AddContactActionType)
: ContactListType => (
  action.type === CONTACT_ADDED ? sortContactList(addContact(contactList, action.newContact)) : contactList
);

/**
 * Reduces the contact list removing the contact in case it exists
 * @param {ContactListType} contactList The current contact list
 * @param {RemoveContactActionType} action The remove contact action
 * @returns {ContactListType} The new contact removing the specified contact
 * @private
 */
const contactRemovedReducer = (contactList: ContactListType = [], action: RemoveContactActionType)
: ContactListType => (
  action.type === CONTACT_REMOVED ? removeContact(contactList, action.contactID) : contactList
);

/**
 * Reduces the contact list updating the contact in case it exists
 * @param {ContactListType} contactList The current contact list
 * @param {UpdateContactActionType} action The update contact action
 * @returns {ContactListType} The new contact list modifying the contact to be updated
 * @private
 */
const contactUpdatedReducer = (contactList: ContactListType = [], action: UpdateContactActionType)
: ContactListType => (
  action.type === CONTACT_UPDATED ? updateContact(contactList, action.updatedContact) : contactList
);

const actionHandlers = {
  CONTACT_ADDED: contactAddedReducer,
  CONTACT_REMOVED: contactRemovedReducer,
  CONTACT_UPDATED: contactUpdatedReducer,
};

/**
 * Reduces the contact list based on the action
 * @param {ContactListType} contactList The current contact list
 * @param {CommonActionType} action The action to be handled
 * @returns {ContactListType} The new contact list modifying based on the incoming action
 * @public
 */
const contactListReducer = (contactList: ContactListType = [], action: CommonActionType) => {
  const handler = actionHandlers[action.type];
  if (handler) {
    return handler(contactList, action);
  }
  return contactList;
};

export default contactListReducer;
