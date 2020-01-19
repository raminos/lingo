import React from 'react';
// test utilities and modules
import { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';
// component
import GuessedWords from './GuessedWords';
// needed contexts
import guessedWordsContext from '../contexts/guessedWordsContext';
import languageContext from '../contexts/languageContext';
// mock data
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
 * Factory function to create a mountWrapper for the GuessedWords component.
 * @function setup
 * @param {array} guessedWords - Component props specific to this setup
 * @returns {ReactWrapper}
 */
const setup = (guessedWords = [], language = 'en') => {
  const mockUseGuessedWords = jest.fn().mockReturnValue([guessedWords, jest.fn()]);
  const mockUselanguage = jest.fn().mockReturnValue([language, jest.fn()])

  return mount(
    <languageContext.LanguageProvider value={mockUselanguage()}>
      <guessedWordsContext.GuessedWordsProvider value={mockUseGuessedWords()}>
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
  test('renders instructions to guess a word', () => {
    const instructions = findByTestAttribute(wrapper, 'guess-instructions');
    expect(instructions.text().length).not.toBe(0);
  })
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
    const guessedWordsNode = findByTestAttribute(wrapper, 'guessed-words');
    expect(guessedWordsNode.length).toBe(1)
  });
  test('correct number of guessed words', () => {
    const guessedWordsNodes = findByTestAttribute(wrapper, 'guessed-word');
    expect(guessedWordsNodes.length).toBe(guessedWords.length);
  });
});

describe('LanguagePicker', () => {
  test('correctly renders the guess instructions string in English by default', () => {
    const wrapper = setup([]);
    const guessInstructions = findByTestAttribute(wrapper, 'guess-instructions');
    expect(guessInstructions.text()).toContain('guess')
  })
  test('correctly renders guess instructions string in French', () => {
    const wrapper = setup([], 'fr');
    const guessInstructions = findByTestAttribute(wrapper, 'guess-instructions');
    expect(guessInstructions.text()).toContain('deviner');
  })
})