import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttribute, checkProps } from '../test/testUtilities';
import Input from './Input';

const defaultProps = { secretWord: 'party' };

/**
 * Setup function to test the input component using a ShallowWrapper
 * @param {object} [props] - the optional props needed for the test
 * @returns {ShallowWrapper} - returns an Enzyme ShallowWrapper
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props }
  return shallow(<Input {...setupProps} />)
}

test('renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttribute(wrapper, 'component-input');
  expect(component.length).toBe(1);
});
test('does not throw error with expected props', () => {
  checkProps(Input, defaultProps);
});

describe('state controlled input field', () => {
  let mockSetCurrentGuess;
  let wrapper;

  beforeEach(() => {
    mockSetCurrentGuess = jest.fn();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup();
  })
  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttribute(wrapper, 'input-box');
    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
  test('state updates without value of input box upon change', () => {
    const submitButton = findByTestAttribute(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() { } });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});