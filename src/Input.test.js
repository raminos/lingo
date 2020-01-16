import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttribute, checkProps } from '../test/testUtilities';
import Input from './Input';

const defaultProps = {};

/**
 * Setup function to test the input component using a ShallowWrapper
 * @param {object} [props] - the optional props needed for the test
 * @returns {ShallowWrapper} - returns an Enzyme ShallowWrapper
 */
const setup = (props) => {
  const setupProps = { ...defaultProps, ...props }
  return shallow(<Input { ...setupProps } />)
}

test('renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttribute(wrapper, 'component-input');
  expect(component.length).toBe(1);
});