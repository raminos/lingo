import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttribute, checkProps } from '../test/testUtilities';
import App from './App';

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => {
  return shallow(<App />);
};

test('renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttribute(wrapper, 'component-app');
  expect(component.length).toBe(1);
});
