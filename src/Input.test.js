import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttribute, checkProps } from '../test/testUtilities';
import Input from './Input';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

/**
 * Setup function to test the input component using a ReactWrapper.
 * @param {object} testValues - Context and props values for this specific test.
 * @returns {ShallowWrapper} - ReactWrapper for Input component and providers
 */
const setup = ({ language, secretWord, success }) => {
  language = language || 'en';
  secretWord = secretWord || 'party';
  success = success || false;

  return mount(
    <languageContext.Provider value={language} >
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <guessedWordsContext.GuessedWordsProvider>
          <Input secretWord={secretWord} />
        </guessedWordsContext.GuessedWordsProvider>
      </successContext.SuccessProvider>
    </languageContext.Provider>
  )
}

test('renders without errors', () => {
  const wrapper = setup({});
  const component = findByTestAttribute(wrapper, 'component-input');
  expect(component.length).toBe(1);
});
test('does not throw error with expected props', () => {
  checkProps(Input, { secretWord: 'party' });
});

describe('state controlled input field', () => {
  let mockSetCurrentGuess;
  let wrapper;

  beforeEach(() => {
    mockSetCurrentGuess = jest.fn();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({});
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

describe('LanguagePicker', () => {
  test('correctly renders submit string in english', () => {
    const wrapper = setup({ language: 'en' });
    const submitButton = findByTestAttribute(wrapper, 'submit-button');
    expect(submitButton.text()).toBe('Submit');
  });
  test('correctyl renders submit string in emoiji', () => {
    const wrapper = setup({ language: 'emoji' });
    const submitButton = findByTestAttribute(wrapper, 'submit-button');
    expect(submitButton.text()).toBe('🚀');
  });
});

test('Input component does not show when success is true', () => {
  const wrapper = setup({ secretWord: 'party', success: true });
  expect(wrapper.isEmptyRender()).toBe(true);
});