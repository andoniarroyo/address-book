// @flow
// internal modules
import contactListReducer from './reducers';

export type ContactType = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    countryCode: string,
}

export type ContactPartialType = {
  id?: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  countryCode?: string,
}

export type ContactListType = Array<ContactType>;

export type StateType = {
  contacts: ContactListType
}

const reducers = {
  contacts: contactListReducer,
};

export default reducers;
