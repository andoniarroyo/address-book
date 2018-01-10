import { isValidContact, createContact } from '../../main/model/contact';

describe('model/contact.js', () => {
  describe('cheking if the contact is valid', () => {
    it('returns false if there is no contact', () => {
      const newContact = undefined;
      const expectedValidation = false;
      const isValid = isValidContact(newContact);

      expect(isValid).toBe(expectedValidation);
    });
    it('returns false if there is no firstName', () => {
      const newContact = { id: 'ID' };
      const expectedValidation = false;
      const isValid = isValidContact(newContact);

      expect(isValid).toBe(expectedValidation);
    });
    it('returns false if there is no lasttName', () => {
      const newContact = { id: 'ID', firstName: 'Andoni' };
      const expectedValidation = false;
      const isValid = isValidContact(newContact);

      expect(isValid).toBe(expectedValidation);
    });
    it('returns false if there is no email', () => {
      const newContact = { id: 'ID', firstName: 'Andoni', lastName: 'Arroyo' };
      const expectedValidation = false;
      const isValid = isValidContact(newContact);

      expect(isValid).toBe(expectedValidation);
    });
    it('returns false if the email format i not valid', () => {
      const newContact = {
        id: 'ID', firstName: 'Andoni', lastName: 'Arroyo', email: 'andoni.arroyo',
      };
      const expectedValidation = false;
      const isValid = isValidContact(newContact);

      expect(isValid).toBe(expectedValidation);
    });
    it('returns false if there is no countryCode', () => {
      const newContact = {
        id: 'ID', firstName: 'Andoni', lastName: 'Arroyo', email: 'andoni.arroyo@gmail.com', countryCode: null,
      };
      const expectedValidation = false;
      const isValid = isValidContact(newContact);

      expect(isValid).toBe(expectedValidation);
    });
    it('returns true if the contact is valid', () => {
      const newContact = {
        id: 'ID', firstName: 'Andoni', lastName: 'Arroyo', email: 'andoni.arroyo@gmail.com', countryCode: 'GB',
      };
      const expectedValidation = true;
      const isValid = isValidContact(newContact);

      expect(isValid).toBe(expectedValidation);
    });
    it('returns true if the contact is valid, including 0 as the id', () => {
      const newContact = {
        id: '0', firstName: 'Andoni', lastName: 'Arroyo', email: 'andoni.arroyo@gmail.com', countryCode: 'GB',
      };
      const expectedValidation = true;
      const isValid = isValidContact(newContact);

      expect(isValid).toBe(expectedValidation);
    });
  });

  describe('creating a new contact', () => {
    it('returns the created contact with the reported values', () => {
      const newContact = {
        id: 'ID', firstName: 'Andoni', lastName: 'Arroyo', email: 'andoni.arroyo@gmail.com', countryCode: 'GB',
      };
      const contact = createContact(newContact);

      expect(contact).toEqual(newContact);
    });
    it('returns the created contact with the new id', () => {
      const newContact = { };
      const contact = createContact(newContact);

      expect(contact.id).toBeTruthy();
    });
    it('returns the created contact with the default country code values', () => {
      const newContact = { };
      const expectedCountryCode = 'GB';
      const contact = createContact(newContact);

      expect(contact.countryCode).toBe(expectedCountryCode);
    });
  });
});
