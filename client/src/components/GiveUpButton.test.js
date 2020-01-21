import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import languageContext from '../contexts/languageContext';
import performanceContext from '../contexts/performanceContext';

import GiveUpButton from './GiveUpButton';
import guessedWordsContext from '../contexts/guessedWordsContext';


/**
 * Spy function to test, whether the button has called setPerformance.
 */
const mockSetPerformance = jest.fn();

/**
 * Factory function to create a ReactWrapper for the GiveUpButton component.
 * @function setup
 * @param {Object} context - Incorporates all the contexts' states.
 * @param {Object} [context.performance] - Sets performanceContext to 
 * the needed setup.
 * @param {string} [context.language = 'en'] - Sets languageContext to 
 * the needed setup.
 * @param {Array} [context.guessedWords = []] - Sets guessedWordsContext 
 * to the needed setup.
 * @returns {Enzyme.ReactWrapper} A ReactWrapper of the isolated component in it's needed contexts.
 */
const setup = ({ performance, language, guessedWords }) => {
  performance = performance || { success: false, giveUp: false };
  language = language || 'en';
  guessedWords = guessedWords || [];

  const wrapper = mount(
    <guessedWordsContext.GuessedWordsProvider value={[guessedWords, jest.fn()]}>
      <languageContext.LanguageProvider value={[language, jest.fn()]}>
        <performanceContext.PerformanceProvider value={[performance, mockSetPerformance]}>
          <GiveUpButton />
        </performanceContext.PerformanceProvider>
      </languageContext.LanguageProvider>
    </guessedWordsContext.GuessedWordsProvider>
  );

  const component = findByTestAttribute(wrapper, 'component-give-up-button');
  const giveUpButton = findByTestAttribute(wrapper, 'give-up-button')

  return [component, giveUpButton];
}

describe('Behaviour before the first guess state', () => {
  const [component, giveUpButton] = setup({});
  test('renders without errors', () => {
    expect(component.length).toBe(1);
  });
  test('renders English string', () => {
    expect(component.text()).toMatch(/give/i);
  });
  test('renders as a disabled button', () => {
    expect(component.html()).toMatch(/disabled/i);
  });
  test('click does not trigger usePerformance hook', () => {
    mockSetPerformance.mockClear();
    giveUpButton.simulate('click');
    expect(mockSetPerformance).not.toHaveBeenCalled();
  });
});

describe('Behaviour after the first guess', () => {
  let component;
  let giveUpButton;
  beforeEach(() => {
    [component, giveUpButton] = setup({
      language: 'fr',
      guessedWords: { guessedWord: 'patsy' }
    });
  });
  test('renders French string when French is selected', () => {
    expect(component.text()).toMatch(/abandonner/i);
  });
  test('does not render as disabled after first guess', () => {
    expect(component.html()).not.toMatch(/disabled/i);
  });
  test('click triggers usePerformance hook', () => {
    mockSetPerformance.mockClear();
    giveUpButton.simulate('click');
    expect(mockSetPerformance).toHaveBeenCalled();
  });
});