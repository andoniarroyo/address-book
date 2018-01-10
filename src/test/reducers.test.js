import contactListReducer from '../main/reducers';
import { addContact, removeContact, updateContact } from '../main/actions';
import { createContact } from '../main/model/contact';

describe('reducers.js', () => {
  it('returns the same state if the action is not handled', () => {
    const contactList = [createContact({ id: '1', lastName: 'Arroyo' })];
    const action = { type: 'unhandledType' };

    const newContactList = contactListReducer(contactList, action);
    expect(newContactList).toBe(contactList);
  });
  describe('adding a contact', () => {
    it('adds the new contact if the action is addContact', () => {
      const contactList = [];
      const newContact = createContact({ id: '1', lastName: 'Arroyo' });
      const action = addContact(newContact);

      const newContactList = contactListReducer(contactList, action);
      expect(newContactList[0]).toEqual(newContact);
    });
    it('adds the new contact if the action is addContact, ordering asc based on the last name', () => {
      const contactList = [createContact({ id: '1', lastName: 'zubizarreta' })];
      const newContact = createContact({ id: '2', lastName: 'Arroyo' });
      const action = addContact(newContact);

      const newContactList = contactListReducer(contactList, action);
      expect(newContactList[0]).toEqual(newContact);
    });
  });
  describe('removing a contact', () => {
    it('removes the contact with the specified identifier', () => {
      const contactList = [createContact({ id: '1', lastName: 'Zubizarreta' })];
      const contactID = '1';
      const action = removeContact(contactID);

      const newContactList = contactListReducer(contactList, action);
      expect(newContactList.length).toEqual(0);
    });

    it('does not remove any contact if the contact identifier specified does not exist', () => {
      const contactList = [createContact({ id: '1', lastName: 'Zubizarreta' })];
      const contactID = '2';
      const action = removeContact(contactID);

      const newContactList = contactListReducer(contactList, action);
      expect(newContactList.length).toEqual(1);
    });
  });
  describe('updating a contact', () => {
    it('updates the contact with the new contat information', () => {
      const contactList = [createContact({ id: '1', lastName: 'Zubizarreta' })];
      const updatedContact = createContact({ id: '1', lastName: 'Arroyo' });
      const action = updateContact(updatedContact);

      const newContactList = contactListReducer(contactList, action);
      expect(newContactList[0]).toEqual(updatedContact);
    });

    it('does not update any contact if the updated contact does not exist', () => {
      const contactList = [createContact({ id: '1', lastName: 'Zubizarreta' })];
      const updatedContact = createContact({ id: '2', lastName: 'Arroyo' });
      const action = updateContact(updatedContact);

      const newContactList = contactListReducer(contactList, action);
      expect(newContactList[0]).toEqual(contactList[0]);
    });
  });
});
