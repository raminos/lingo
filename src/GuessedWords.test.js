import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttribute } from '../test/testUtilities';
import GuessedWords from './GuessedWords';

import guessedWordsContext from './contexts/guessedWordsContext';

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {array} guessedWords - Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (guessedWords = []) => {
  const mockUseGuessedWords = jest.fn().mockReturnValue([guessedWords, jest.fn()]);
  guessedWordsContext.useGuessedWords = mockUseGuessedWords;
  return shallow(<GuessedWords />);
};


describe('if there are no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup([]);
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
  const guessedWords = [
    { guessedWord: 'train', letterMatchCount: 3 },
    { guessedWord: 'agile', letterMatchCount: 1 },
    { guessedWord: 'party', letterMatchCount: 5 },
  ]

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
  test('correctly renders guess instructions string in emoji', () => {
    const mockUseContext = jest.fn().mockReturnValue('emoji');
    React.useContext = mockUseContext;

    const wrapper = setup([]);
    const guessInstructions = findByTestAttribute(wrapper, 'guess-instructions');

    expect(guessInstructions.text()).toBe('🤔🤫🔤');
  })
})