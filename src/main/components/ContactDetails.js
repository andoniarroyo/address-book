// @flow
// external modules
import React from 'react';
import { Link } from 'react-router-dom';
// internal types
import type { ContactType } from '../index';
import type { AddContactActionFactoryType, UpdateContactActionFactoryType } from '../actions';
// internal modules
import { HOME_PATH, INVALID_CONTACT_PATH, ADD_MODE, EDIT_MODE } from '../constants';
import { createContact, isValidContact } from '../model/contact';
import ContactInfo from './ContactInfo';
// styles
import '../styles/components/contactDetails.scss';

type TargetType = {
  name: string,
  value: string,
}

export type EventType = {
  target: TargetType,
  preventDefault: () => void,
}

type GetContactType = string => ContactType;

type ContactDetailsPropsType = {
  getContact: GetContactType,
  addContact: AddContactActionFactoryType,
  updateContact: UpdateContactActionFactoryType,
  match: {
    params: {
      id: string
    }
  },
  history: Array<string>,
};

type StateChangingType = {
  isValidToSubmit: boolean,
  contact: ContactType,
}

type StateType = {
  mode: 'ADD' | 'EDIT',
  invalidIdentifier: boolean,
  isValidToSubmit: boolean,
  contact: ContactType,
}

/**
 * Calculates the initial state object for the component
 * @param {string} id The contact id trying to be loaded
 * @param {GetContactType} getContact Function to be used to load the contact
 * @returns {StateType} The calculated initial state
 * @private
 */
const calculateInitialState = (id: string, getContact: GetContactType): StateType => {
  const contact = id ? getContact(id) : createContact({});
  return {
    mode: id ? EDIT_MODE : ADD_MODE,
    invalidIdentifier: !contact,
    isValidToSubmit: isValidContact(contact),
    contact,
  };
};

/**
 * Calculates the new value for the changing part of the state, the related with the contact
 * @param {EventType} event The happened event
 * @param {StateType} previousState The state to be used as reference
 * @returns {StateChangingType} The changing part of the state calculated
 * @private
 */
const recalculateChangingState = (event: EventType, previousState: StateType): StateChangingType => {
  const newContact = { ...previousState.contact };
  newContact[event.target.name] = event.target.value;
  return {
    isValidToSubmit: isValidContact(newContact),
    contact: newContact,
  };
};

/**
 * Navigates to the invaid content using the history provided by the router
 * @param {Array<string>} history The navigation history object
 * @returns {void}
 * @private
 */
const navigateToInvalidContatAsync = (history: Array<string>): void => {
  history.push(INVALID_CONTACT_PATH);
};

/**
 * The contact render method
 * @param {ContactDetailsPropsType} props The properties to render the object
 * @returns {React$Element<any>} HTML markup for the component
 */
class ContactDetails extends React.Component {
  constructor(props: ContactDetailsPropsType) {
    super(props);

    // set state
    this.state = calculateInitialState(this.props.match.params.id, this.props.getContact);

    // bind functions
    this.onFieldChanged = this.onFieldChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // the received id could be not valid
    if (this.state.invalidIdentifier) {
      navigateToInvalidContatAsync(this.props.history);
    }

    // setup the actions
    this.actions = {
      [ADD_MODE]: this.props.addContact,
      [EDIT_MODE]: this.props.updateContact,
    };
  }
  // properties
  onFieldChanged: (event: EventType) => void;
  handleSubmit: (event: EventType) => void;
  props: ContactDetailsPropsType;
  state: StateType;
  actions: Object;

  /**
   * Updates the model based on the field changed event
   * @param {EventType} event The event representing what happened
   * @returns {void}
   * @private
   */
  onFieldChanged(event: EventType): void {
    this.setState(recalculateChangingState(event, this.state));
  }

  /**
   * Submits the form, executing the proper action associated
   * @param {EventType} event The event representing what happened
   * @returns {void}
   * @private
   */
  handleSubmit(event: EventType): void {
    event.preventDefault();
    this.actions[this.state.mode](this.state.contact);
    this.props.history.push(HOME_PATH);
  }

  render(): ?React.Element<*> {
    if (this.state.invalidIdentifier) {
      return null;
    }
    return (
      <main className="contact-info">
        <header>
          <h3>
            Contact information:
          </h3>
        </header>
        <Link to="/">
          Home
        </Link>
        <ContactInfo contact={this.state.contact}
          onSubmit={this.handleSubmit}
          onFieldChanged={this.onFieldChanged}
          isValidToSubmit={this.state.isValidToSubmit}
        />
      </main>
    );
  }
}

export default ContactDetails;
