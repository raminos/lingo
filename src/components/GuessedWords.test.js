import React from 'react';

import Enzyme, { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import GuessedWords from './GuessedWords';

import guessedWordsContext from '../contexts/guessedWordsContext';
import languageContext from '../contexts/languageContext';

/**
 * Mock Array for testing.
 * @constant guessedWords
 * @type {Object[]}
 */
const guessedWords = [
  {
    "guessedWord": "train",
    "matchingLetters": {
      "matchingPositions": {},
      "notMatchingPositions": {
        "1": "r",
        "3": "i"
      }
    }
  },
  {
    "guessedWord": "games",
    "matchingLetters": {
      "matchingPositions": {
        "3": "e"
      },
      "notMatchingPositions": {}
    }
  },
  {
    "guessedWord": "fiver",
    "matchingLetters": {
      "matchingPositions": {
        "0": "f",
        "1": "i",
        "2": "v",
        "3": "e",
        "4": "r"
      },
      "notMatchingPositions": {}
    }
  }
]

/**
 * Factory function to create a ReactWrapper for the GuessedWords component.
 * @function setup
 * @param {array} [guessedWords = []] - Sets guessedWordsContext to the needed setup.
 * @param {string} [language = 'en'] - Sets languageContext to the needed setup.
 * @returns {Enzyme.ReactWrapper} A ReactWrapper of the isolated component in it's needed contexts.
 */
const setup = (guessedWords = [], language = 'en') => {
  return mount(
    <languageContext.LanguageProvider value={[language, jest.fn()]}>
      <guessedWordsContext.GuessedWordsProvider value={[guessedWords, jest.fn()]}>
        <GuessedWords />
      </guessedWordsContext.GuessedWordsProvider>
    </languageContext.LanguageProvider>
  );
};


describe('if there are no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  test('renders without error', () => {
    const component = findByTestAttribute(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });
});

describe('if there are words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(guessedWords);
  })

  test('renders without error', () => {
    const component = findByTestAttribute(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });
  test('renders guessed word section', () => {
    const guessedWordsNode = findByTestAttribute(wrapper, 'guessed-word');
    expect(guessedWordsNode).toBeTruthy();
  });
  test('correct number of guessed words', () => {
    const guessedWordsNodes = findByTestAttribute(wrapper, 'guessed-word');
    expect(guessedWordsNodes.length).toBe(guessedWords.length);
  });
});

describe('LanguagePicker', () => {
  test('correctly renders table heading in English by default', () => {
    const wrapper = setup([]);
    const component = findByTestAttribute(wrapper, 'component-guessed-words');
    expect(component.text()).toMatch(/guess/i)
  });
  test('correctly renders table heading in French', () => {
    const wrapper = setup([], 'fr');
    const component = findByTestAttribute(wrapper, 'component-guessed-words');
    expect(component.text()).toMatch(/suggéré/i);
  });
});