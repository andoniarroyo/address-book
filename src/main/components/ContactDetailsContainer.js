// @flow
// external modules
import { connect } from 'react-redux';
// internal types
import type { StateType, ContactType } from '../index';
// internal modules
import { addContact, updateContact } from '../actions';
import ContactDetails from './ContactDetails';
import { contactSelector } from '../selectors';

type StateToPropsType = {
  getContact: string => ?ContactType;
}

/**
 * Maps the application state to props passed to the component
 * @param {StateType} state The application redux state
 * @returns {StateToPropsType} The props coming from the state
 * @private
 */
const mapStateToProps = (state: StateType): StateToPropsType => ({
  getContact: contactSelector.bind(null, state),
});

const mapDispatchToProps = {
  addContact,
  updateContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);
