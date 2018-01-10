// external modules
import React from 'react';
import renderer from 'react-test-renderer';
// internal modules
import EmptyContacts from '../../main/components/EmptyContacts';

describe('<EmptyContacts />', () => {
  it('renders the component', () => {
    const tree = renderer.create(<EmptyContacts />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
