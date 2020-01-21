import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { findByTestAttribute, checkProps } from '../../test/testUtilities';
import Input from './Input';

import languageContext from '../contexts/languageContext';
import performanceContext from '../contexts/performanceContext';
import guessedWordsContext from '../contexts/guessedWordsContext';

/**
 * Setup function to test the Input component using a ReactWrapper.
 * @param {object} testValues - Context and props values to setup tests.
 * @param {string} test
 * @returns {Enzyme.ReactWrapper} ReactWrapper for Input component and providers
 */
const setup = ({ language, secretWord, performance }) => {
  language = language || 'en';
  secretWord = secretWord || 'party';
  performance = performance || { success: false };

  return mount(
    <languageContext.LanguageProvider value={[language, jest.fn]} >
      <performanceContext.PerformanceProvider value={[performance, jest.fn()]}>
        <guessedWordsContext.GuessedWordsProvider>
          <Input secretWord={secretWord} />
        </guessedWordsContext.GuessedWordsProvider>
      </performanceContext.PerformanceProvider>
    </languageContext.LanguageProvider>
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
  const mockEvent = { target: { value: 'plane' } };
  let mockSetCurrentGuess;
  let wrapper;

  beforeEach(() => {
    mockSetCurrentGuess = jest.fn();
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
    wrapper = setup({});
  })
  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttribute(wrapper, 'input-box');

    inputBox.simulate('change', mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('plane');
  });
});

describe('LanguagePicker', () => {
  test('correctly renders submit string in english', () => {
    const wrapper = setup({ language: 'en' });
    const submitButton = findByTestAttribute(wrapper, 'submit-button');
    expect(submitButton.text()).toMatch(/submit/i);
  });
  test('correctyl renders submit string in French', () => {
    const wrapper = setup({ language: 'fr' });
    const submitButton = findByTestAttribute(wrapper, 'submit-button');
    expect(submitButton.text()).toMatch(/soumettre/i);
  });
});