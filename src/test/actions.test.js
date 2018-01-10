import { addContact, removeContact, updateContact } from '../main/actions';
import { CONTACT_ADDED, CONTACT_REMOVED, CONTACT_UPDATED } from '../main/constants';
import { createContact } from '../main/model/contact';

describe('actions.js', () => {
  it('creates the addContact action', () => {
    const newContact = createContact({});
    const action = addContact(newContact);

    expect(action.type).toBe(CONTACT_ADDED);
    expect(action.newContact).toBe(newContact);
  });
  it('creates the removeContact action', () => {
    const contactID = 3;
    const action = removeContact(contactID);

    expect(action.type).toBe(CONTACT_REMOVED);
    expect(action.contactID).toBe(contactID);
  });
  it('creates the updateContact action', () => {
    const updatedContact = {};
    const action = updateContact(updatedContact);

    expect(action.type).toBe(CONTACT_UPDATED);
    expect(action.updatedContact).toBe(updatedContact);
  });
});
