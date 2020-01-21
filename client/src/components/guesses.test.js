import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import guessedWordsContext from '../contexts/guessedWordsContext';
import performanceContext from '../contexts/performanceContext';
import languageContext from '../contexts/languageContext';

import Input from './Input';
import GuessedWords from './GuessedWords';
import InfoMessage from './InfoMessage';

/**
 * Factory function to create a ReactWrapper for the GuessedWords component.
 * @function setup
 * @param {array} [guessedWordsStrings = []] - Sets guessedWordsContext to the needed setup.
 * @param {string} [secretWord = 'party'] - Sets the secretWord prop in the Input component to the needed setup.
 * @returns {Enzyme.ReactWrapper[]} An Array of ReactWrappers of the wrapper, as well as the inputBox and the submitButton.
 */
const setup = (guessedWordsStrings = [], secretWord = 'party') => {
  const wrapper = mount(
    <languageContext.LanguageProvider>
      <performanceContext.PerformanceProvider>
        <guessedWordsContext.GuessedWordsProvider>

          <Input secretWord={secretWord} />
          <GuessedWords />
          <InfoMessage />

        </guessedWordsContext.GuessedWordsProvider>
      </performanceContext.PerformanceProvider>
    </languageContext.LanguageProvider>
  );

  const inputBox = findByTestAttribute(wrapper, 'input-box');
  const submitButton = findByTestAttribute(wrapper, 'submit-button');

  // manually prepopulate guessedWords context by simulating word guess
  guessedWordsStrings.map(word => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate('change', mockEvent);
    submitButton.simulate('click', { preventDefault() { } });
  })

  return [wrapper, inputBox, submitButton];
};

describe('test word guesses', () => {
  let wrapper;
  let inputBox;
  let submitButton;

  describe('empty guessedWords', () => {

    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup([], 'party');
    });

    test('incorrect guess is updates the GuessWords table row count', () => {
      const mockEvent = { target: { value: 'train' } };
      
      // simulate user entry
      inputBox.simulate('change', mockEvent);
      submitButton.simulate('click');

      const guessedWordsTableRows = findByTestAttribute(wrapper, 'guessed-word');
      expect(guessedWordsTableRows.length).toBe(1);
    });
    test('renders instructions to guess a word', () => {
      const infoMessage = findByTestAttribute(wrapper, 'component-info-message')
      expect(infoMessage.length).toBe(1);
    })
  })

  describe('non-empty guessedWords', () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup(['agile'], 'party');
    });

    describe('correct guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'party' } };
        
        // simulate user entry
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
      });
      test('GuessedWords table row count reflects updated guess', () => {
        const guessedWordsTableRows = findByTestAttribute(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });

    describe('incorrect guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'train' } };
        
        // simulate user entry
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
      });
      test('Input box remains', () => {
        expect(inputBox.exists()).toBe(true);
      });
      test('GuessedWords table row count reflects updated guess', () => {
        const guessedWordsTableRows = findByTestAttribute(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });
  });
});