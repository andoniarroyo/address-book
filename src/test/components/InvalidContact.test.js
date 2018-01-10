// external modules
import React from 'react';
import renderer from 'react-test-renderer';
// internal modules
import InvalidContact from '../../main/components/InvalidContact';
import staticRouterWrapper from '../utils/staticRouterWrapper';

describe('<InvalidContact />', () => {
  it('renders the component', () => {
    const tree = renderer.create(staticRouterWrapper(<InvalidContact />)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
