import React from 'react';

import { shallow } from 'enzyme';
import { findByTestAttribute } from '../test/testUtilities';

import Nav from './Nav';

const setup = () => {
  const wrapper = shallow(<Nav />);
  const component = findByTestAttribute(wrapper, 'component-nav');
  return component;
}

test('renders without errors', () => {
  const navComponent = setup();
  expect(navComponent.text()).toMatch(/lingo/i);
})
