// @flow
// external modules
import React from 'react';
import { Link } from 'react-router-dom';
import countriesFactory from 'country-list';
// internal types
import type { ContactType } from '../index';
import type { RemoveContactActionFactoryType } from '../actions';

const countries = countriesFactory();

export type ContactRowPropsType = {
  contact: ContactType,
  removeContact: RemoveContactActionFactoryType,
};

/**
 * The contact render method
 * @param {ContactRowPropsType} props The properties to render the object
 * @returns {React$Element<any>} HTML markup for the component
 */
const ContactRow = ({ contact, removeContact }: ContactRowPropsType) => {
  const emailLink = `mailto:${contact.email}`;
  return (
    <article className="contact">
      <span className="item">
        <Link to={`/edit/${contact.id}`}>
          {contact.firstName}
        </Link>
      </span>
      <span className="item">{contact.lastName}</span>
      <span className="item">
        <a href={emailLink}>
          {contact.email}
        </a>
      </span>
      <span className="item">{countries.getName(contact.countryCode)}</span>
      <span className="item item-final">
        <button id="remove-button" onClick={() => removeContact(contact.id)}>
          Remove it!
        </button>
      </span>
    </article>
  );
};

export default ContactRow;
