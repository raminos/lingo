import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import guessedWordsContext from '../contexts/guessedWordsContext';
import performanceContext from '../contexts/performanceContext';
import languageContext from '../contexts/languageContext';

import Input from './Input';
import GuessedWords from './GuessedWords';

const setup = (guessedWordsStrings = [], secretWord = 'party') => {
  const wrapper = mount(
    <languageContext.LanguageProvider>
      <performanceContext.PerformanceProvider>
        <guessedWordsContext.GuessedWordsProvider>

          <Input secretWord={secretWord} />
          <GuessedWords />

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

      inputBox.simulate('change', mockEvent);
      submitButton.simulate('click');

      const guessedWordsTableRows = findByTestAttribute(wrapper, 'guessed-word');
      expect(guessedWordsTableRows.length).toBe(1);
    });
  })

  describe('non-empty guessedWords', () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup(['agile'], 'party');
    });

    describe('correct guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'party' } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
      });
      test('Input component contains no children', () => {
        const inputComponent = findByTestAttribute(wrapper, 'component-input');
        expect(inputComponent.children().length).toBe(0);
      });
      test('GuessedWords table row count reflects updated guess', () => {
        const guessedWordsTableRows = findByTestAttribute(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
      })
    });

    describe('incorrect guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'train' } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
      });
      test('Input box remains', () => {
        expect(inputBox.exists()).toBe(true);
      });
      test('GuessedWords table row count reflects updated guess', () => {
        const guessedWordsTableRows = findByTestAttribute(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
      })
    });
  });
});