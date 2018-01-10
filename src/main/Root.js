// @flow
// external types
import type { Store } from 'redux';
// external modules
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// internal modules
import AddresBook from './Container';
import ContactDetails from './components/ContactDetailsContainer';
import InvalidContact from './components/InvalidContact';

type RootPropsType = {
  store: Store
}

const Root = ({ store }: RootPropsType): React.Element<*> => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={AddresBook} />
        <Route path="/add" component={ContactDetails} />
        <Route path="/edit/:id?" component={ContactDetails} />
        <Route path="/invalid" component={InvalidContact} />
      </Switch>
    </Router>
  </Provider>
);

export default Root;
