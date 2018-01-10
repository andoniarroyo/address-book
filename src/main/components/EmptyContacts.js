// @flow
// external modules
import React from 'react';
// styles
import '../styles/components/emptyContact.scss';

/**
 * The empty contact render method
 * @returns {React$Element<any>} HTML markup for the component
 * @public
 */
const EmptyContacts = () => (
  <article className="empty-container">
    Your address book is empty so far...
    Why not create a new contact?
  </article>
);

export default EmptyContacts;
