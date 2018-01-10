// @flow
// external modules
import React from 'react';
import countriesFactory from 'country-list';
// internal types
import type { ContactType } from '../index';
import type { EventType } from './ContactDetails';
// styles
import '../styles/components/contactInfo.scss';

const countries = countriesFactory();

type ContactInfoPropsType = {
  contact: ContactType,
  onSubmit: (event: EventType) => void,
  onFieldChanged: (event: EventType) => void,
  isValidToSubmit: boolean,
}

type CountryType = {
  code: string,
  name: string,
}

/**
 * Renders the countries options
 * @returns {React$Element<any>} HTML markup for the list of countries options
 * @private
 */
const renderCounties = (): Array<React.Element<*>> => (
  countries.getData().map((country: CountryType): React.Element<*> =>
    <option key={country.code} value={country.code}>{country.name}</option>)
);

/**
 * The contact information render method
 * @param {ContactPropsType} props The properties to render the object
 * @returns {React$Element<any>} HTML markup for the component
 */
const ContactInfo = ({
  contact, onSubmit, onFieldChanged, isValidToSubmit,
} : ContactInfoPropsType): React.Element<*> => (
  <article className="contact-info-container">
    <section>
      <form>
        <div>
          First name:
        </div>
        <div>
          <input id="firstName"
            name="firstName"
            placeholder="first name..."
            defaultValue={contact.firstName}
            required
            maxLength="25"
            onChange={onFieldChanged}
          />
        </div>
        <div>
         Last name:
        </div>
        <div>
          <input id="lastName"
            name="lastName"
            placeholder="last name..."
            defaultValue={contact.lastName}
            required
            maxLength="25"
            onChange={onFieldChanged}
          />
        </div>
        <div>
          Email account:
        </div>
        <div>
          <input id="email"
            name="email"
            placeholder="email..."
            defaultValue={contact.email}
            required
            maxLength="100"
            onChange={onFieldChanged}
          />
        </div>
        <div>
          Country:
        </div>
        <div>
          <select id="countryCode" name="countryCode" defaultValue={contact.countryCode} onChange={onFieldChanged}>
            {renderCounties()}
          </select>
        </div>
        <button id="submit-button" disabled={!isValidToSubmit} onClick={onSubmit}>
          Save it!
        </button>
      </form>
    </section>
  </article>
);

export default ContactInfo;
