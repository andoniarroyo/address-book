import {
  HOME_PATH, INVALID_CONTACT_PATH,
  ADD_MODE, EDIT_MODE,
  CONTACT_ADDED, CONTACT_REMOVED, CONTACT_UPDATED,
  DEFAULT_COUNTRY_CODE,
} from '../main/constants';

describe('constants.js', () => {
  describe('contact info modes', () => {
    it('defines the home path', () => {
      expect(typeof HOME_PATH).toBe('string');
    });
    it('defines the invalid contact path', () => {
      expect(typeof INVALID_CONTACT_PATH).toBe('string');
    });
  });
  describe('contact info modes', () => {
    it('defines the add mode', () => {
      expect(typeof ADD_MODE).toBe('string');
    });
    it('defines the edit mode', () => {
      expect(typeof EDIT_MODE).toBe('string');
    });
  });
  describe('action related contacts', () => {
    it('defines the contact added type', () => {
      expect(typeof CONTACT_ADDED).toBe('string');
    });
    it('defines the contact removed type', () => {
      expect(typeof CONTACT_REMOVED).toBe('string');
    });
    it('defines the contact updated type', () => {
      expect(typeof CONTACT_UPDATED).toBe('string');
    });
  });
  describe('settings', () => {
    it('defines the default country code', () => {
      expect(typeof DEFAULT_COUNTRY_CODE).toBe('string');
    });
  });
});

