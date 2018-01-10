// @flow
// external modules
import { connect } from 'react-redux';
// internal types
import type { StateType, ContactListType } from './index';
// internal modules
import { contactListSelector } from './selectors';
import { addContact, removeContact, updateContact } from './actions';
import AddressBook from './AddressBook';

type StateToPropsType = {
  contactList: ContactListType
}

/**
 * Maps the application state to props passed to the component
 * @param {StateType} state The application redux state
 * @returns {StateToPropsType} The props coming from the state
 * @private
 */
const mapStateToProps = (state: StateType): StateToPropsType => ({
  contactList: contactListSelector(state),
});

const mapDispatchToProps = {
  addContact,
  removeContact,
  updateContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressBook);
