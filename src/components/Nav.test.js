import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import Nav from './Nav';

/**
 * Factory function to create a ShallowWrapper for the Nav component.
 * @function setup
 * @returns {Enzyme.ShallowWrapper} A ShallowWrapper of the isolated component.
 */
const setup = () => {
  const wrapper = shallow(<Nav />);
  const component = findByTestAttribute(wrapper, 'component-nav');
  return component;
}

test('renders without errors', () => {
  const navComponent = setup();
  expect(navComponent.text()).toMatch(/lingo/i);
})
