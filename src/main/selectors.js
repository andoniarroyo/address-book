// @flow
// internal types
import type { StateType, ContactType, ContactListType } from './index';

/**
 * Gets the contact list from the state
 * @param {StateType} state The curent state of the application
 * @returns {MatchScoreType} The contacts list in the state, or the default one in case it is not there
 * @public
 */
export const contactListSelector = (state: StateType): ContactListType => (state && state.contacts) || [];

/**
 * Gets the contact with the passed identifier from the state
 * @param {StateType} state The curent state of the application
 * @param {string} id The contact idetifier
 * @returns {ContactType} The relatd contact if it exists, Undefined otherwise
 * @public
 */
export const contactSelector = (state: StateType, id: string): ?ContactType =>
  contactListSelector(state).find((contact: ContactType): boolean => contact.id === id);

