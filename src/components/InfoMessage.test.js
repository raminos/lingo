import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import InfoMessage from './InfoMessage';

/**
 * Factory function to create a ShallowWrapper for the InfoMessage component.
 * @function setup
 * @param {string} message - The message to be displayed inside the component.
 * @returns {Enzyme.ShallowWrapper} A ShallowWrapper of the isolated component.
 */
const setup = (message) => {
  return shallow(<InfoMessage>{message}</InfoMessage>)
}

test('renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttribute(wrapper, 'component-info-message');
  expect(component.length).toBe(1);
});
test('renders test message', () => {
  const wrapper = setup('This is a test message');
  const component = findByTestAttribute(wrapper, 'component-info-message');
  expect(component.text()).toBe('This is a test message');
});
