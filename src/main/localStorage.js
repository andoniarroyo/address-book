// @flow
import type { StateType } from './index';

/**
 * Loads the state from the local storage
 * @returns {?StateType} The saved state
 * @public
 */
export const loadState = (): ?StateType => {
  const state = localStorage.getItem('state');
  return state ? JSON.parse(state) : null;
};

/**
 * Saves the state to the local storage
 * @param {StateType} state The state to be saved
 * @returns {void}
 * @public
 */
export const saveState = (state: StateType): void => localStorage.setItem('state', JSON.stringify(state));
