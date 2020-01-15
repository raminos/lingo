import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttribute, checkProps } from '../test/testUtilities';
import Congrats from './Congrats';

const defaultProps = { success: false };

/**
 * Factory function to create a ShallowWrapper for the Congrats component.
 * @function setup
 * @param {objext} [props] - Component props specific to this setup.
 * @returns {ShallowWrapper} 
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props }
  return shallow(<Congrats {...setupProps} />);
}

test('renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttribute(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});
test('renders no text when `success` prop is false', () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttribute(wrapper, 'component-congrats');
  expect(component.text()).toBe('');
});
test('renders non-empty congrats message when `success` prop is true', () => {
  const wrapper = setup({ success: true });
  const component = findByTestAttribute(wrapper, 'congrats-message');
  expect(component.text().length).not.toBe(0);
});
test('does not throw warning with expected props', () => {
  const expectedProps = { success: false };
  checkProps(Congrats, expectedProps);
}); 