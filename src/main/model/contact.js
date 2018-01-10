// @flow
// external modules
import shortid from 'shortid';
// internal types
import type { ContactPartialType, ContactType } from '../index';
// internal modules
import { DEFAULT_COUNTRY_CODE } from '../constants';

/**
 * Checks if the incoming string exists and is longer than 0
 * @param {string} stringToValidate The string to be evaluated
 * @return {boolean} True if the string is longer than 0, False otherwise
 * @private
 */
const existingString = (stringToValidate: string): boolean => !!(stringToValidate);

/**
 * Checks if the email reported is a valid email
 * @param {string} emailToValidate Email account to be evaluated
 * @return {boolean} True if the email is valid, False otherwise
 * @private
 */
const isValidEmail = (emailToValidate: string): boolean => (
  new RegExp(/(\w+)@(\w+).[a-zA-Z]/g).test(emailToValidate)
);

/**
 * Checks if the incoming contact has a valid values for the required properties
 * @param {ContactType} contact The contact to be evaluated
 * @return {boolean} True if the contact is valid, False otherwise
 * @public
 */
export const isValidContact = (contact: ContactType): boolean => (
  Boolean(contact && existingString(contact.id) && existingString(contact.firstName)
    && existingString(contact.lastName) && isValidEmail(contact.email) && existingString(contact.countryCode))
);

/**
 * Creates a new contact with the default values for the non informed properties
 * @param {ContactPartialType} contactPartial Contact partially informed to be used as refeence
*  @return {ContactType} The created contact
 * @public
 */
export const createContact = ({
  id = shortid.generate(), firstName = '', lastName = '', email = '', countryCode = DEFAULT_COUNTRY_CODE,
}
: ContactPartialType): ContactType => (
  {
    id, firstName, lastName, email, countryCode,
  }
);
