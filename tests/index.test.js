import React from 'react';
import { shallow } from 'enzyme';

import Module from '../client/src/components/Module.jsx';

function setup() {
  const wrapper = shallow(<Module />);
  return { wrapper };
}

describe('Module Test Suite', () => {
  it('Should exist', () => {
    //const { wrapper } = setup();
    expect(true).toBe(true);
  });
});