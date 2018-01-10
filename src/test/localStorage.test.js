import { loadState, saveState } from '../main/localStorage';

describe('localStorage.js', () => {
  // using the "jest-localstorage-mock"
  describe('loading the state', () => {
    beforeEach(() => {
      localStorage.getItem.mockReset();
    });
    it('loads the state from the local storage', () => {
      const expectedState = { contacts: [{ name: 'Andoni' }] };
      localStorage.getItem.mockImplementation(() => JSON.stringify(expectedState));

      const state = loadState();

      expect(state).toEqual(expectedState);
      expect(localStorage.getItem).toHaveBeenCalledWith('state');
    });
    it('loads null if there is no "state" key in the local storage', () => {
      const expectedState = null;
      localStorage.getItem.mockImplementation(() => null);

      const state = loadState();

      expect(state).toEqual(expectedState);
    });
  });
  describe('saving the state', () => {
    beforeEach(() => {
      localStorage.setItem.mockReset();
    });
    it('saves the state to the local storage', () => {
      const newState = { contacts: [{ name: 'Andoni' }] };
      saveState(newState);

      expect(localStorage.setItem).toHaveBeenCalledWith('state', JSON.stringify(newState));
    });
  });
});
