// @flow
// internal types
import type { ContactType } from './index';
// internal modules
import { CONTACT_ADDED, CONTACT_REMOVED, CONTACT_UPDATED } from './constants';

export type CommonActionType = {
  type: string,
}

export type AddContactActionType = {
  type: string,
  newContact: ContactType
};

export type AddContactActionFactoryType = (newContact: ContactType) => AddContactActionType;

export type RemoveContactActionType = {
  type: string,
  contactID: string
};

export type RemoveContactActionFactoryType = (contactID: string) => RemoveContactActionType;

export type UpdateContactActionType = {
  type: string,
  updatedContact: ContactType
};

export type UpdateContactActionFactoryType = (updatedContact: ContactType) => UpdateContactActionType;

/**
 * Action creator to add a new contact
 * @param {ContactType} newContact The new contact to be added
 * @returns {AddContactActionType} The generated action
 * @public
 */
export const addContact = (newContact: ContactType): AddContactActionType => (
  {
    type: CONTACT_ADDED,
    newContact,
  }
);

/**
 * Action creator to remove a new contact
 * @param {string} contactID The identifier of the contact to be removed
 * @returns {RemoveContactActionType} The generated action
 * @public
 */
export const removeContact = (contactID: string) : RemoveContactActionType => (
  {
    type: CONTACT_REMOVED,
    contactID,
  }
);

/**
 * Action creator to update a contact
 * @param {ContactType} updatedContact The contact to be updated with the new information
 * @returns {UpdateContactActionType} The generated action
 * @public
 */
export const updateContact = (updatedContact: ContactType) : UpdateContactActionType => (
  {
    type: CONTACT_UPDATED,
    updatedContact,
  }
);
