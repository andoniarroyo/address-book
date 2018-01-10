import { contactSelector, contactListSelector } from '../main/selectors';
import { createContact } from '../main/model/contact';

describe('selectors.js', () => {
  describe('getting a contact selector', () => {
    it('returns the contact from the state', () => {
      const contactId = 1;
      const contact = createContact({ id: contactId, countryCode: 'es' });
      const state = { contacts: [contact] };
      const contactSelected = contactSelector(state, contactId);

      expect(contactSelected).toEqual(contact);
    });
    it('returns undefined if the contact is not in the state', () => {
      const contactId = 1;
      const nonExstingContactId = 2;
      const contact = createContact({ id: contactId });
      const state = { contacts: [contact] };
      const contactSelected = contactSelector(state, nonExstingContactId);

      expect(contactSelected).toBeUndefined();
    });
  });

  describe('getting the contact list selector', () => {
    it('returns a default contact list if there is no state', () => {
      const expectedContactList = [];
      const state = undefined;
      const contactList = contactListSelector(state);

      expect(contactList).toEqual(expectedContactList);
    });
    it('returns a default contact list if the state has no contact list', () => {
      const expectedContactList = [];
      const state = {};
      const contactList = contactListSelector(state);

      expect(contactList).toEqual(expectedContactList);
    });
    it('returns the contact list from the state', () => {
      const expectedContactList = [createContact({})];
      const state = { contacts: expectedContactList };
      const contactList = contactListSelector(state);

      expect(contactList).toEqual(expectedContactList);
    });
  });
});
