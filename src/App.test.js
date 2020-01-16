import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttribute, checkProps } from '../test/testUtilities';
import App from './App';

const defaultProps = {};

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<App {...setupProps} />);
};

test('renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttribute(wrapper, 'component-app');
  expect(component.length).toBe(1);
});
