// @flow
// external modules
import React from 'react';
import { Link } from 'react-router-dom';
// styles
import '../styles/components/invalidContact.scss';

/**
 * The invalid contact render method
 * @param {ContactPropsType} props The properties to render the object
 * @returns {React$Element<any>} HTML markup for the component
 */
const InvalidContact = () => (
  <article className="invalid-container">
    <header>
        Ops! This is not a valid contact...
    </header>
    <section>
          You can create a <Link to="/add"> new contact</Link> or you can go to
          the <Link to="/"> home page</Link>
    </section>
  </article>
);

export default InvalidContact;
