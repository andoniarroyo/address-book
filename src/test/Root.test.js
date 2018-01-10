import React from 'react';
import renderer from 'react-test-renderer';

import Root from '../main/Root';

describe('<Root />', () => {
  it('renders the root component', () => {
    const props = {
      store: {
        subscribe: () => {},
        dispatch: () => {},
        getState: () => {},
        setState: () => {},
      },
    };

    const tree = renderer.create(<Root {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
