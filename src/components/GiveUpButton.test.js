import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import languageContext from '../contexts/languageContext';
import performanceContext from '../contexts/performanceContext';

import GiveUpButton from './GiveUpButton';
import guessedWordsContext from '../contexts/guessedWordsContext';

const mockUsePerformance = jest.fn();

const setup = ({ performance, language, guessedWords }) => {
  performance = performance || { success: false, giveUp: false };
  language = language || 'en';
  guessedWords = guessedWords || [];

  const wrapper = mount(
    <guessedWordsContext.GuessedWordsProvider value={[guessedWords, jest.fn()]}>
      <languageContext.LanguageProvider value={[language, jest.fn()]}>
        <performanceContext.PerformanceProvider value={[performance, mockUsePerformance]}>
          <GiveUpButton />
        </performanceContext.PerformanceProvider>
      </languageContext.LanguageProvider>
    </guessedWordsContext.GuessedWordsProvider>
  );

  const component = findByTestAttribute(wrapper, 'component-give-up-button');
  const giveUpButton = findByTestAttribute(wrapper, 'give-up-button')

  return [component, giveUpButton];
}

describe('Behaviour in default state', () => {
  const [component, giveUpButton] = setup({});
  test('renders without errors', () => {
    expect(component.length).toBe(1);
  });
  test('renders English string', () => {
    expect(component.text()).toMatch(/give/i);
  })
  test('renders as a disabled button', () => {
    expect(component.html()).toMatch(/disabled/i);
  })
  test('click does not trigger usePerformance hook', () => {
    mockUsePerformance.mockClear();
    giveUpButton.simulate('click');
    expect(mockUsePerformance).not.toHaveBeenCalled();
  })
})

describe('Behaviour after first guess', () => {
  let component;
  let giveUpButton;
  beforeEach(() => {
    [component, giveUpButton] = setup({
      language: 'fr',
      guessedWords: { guessedWord: 'patsy' }
    });
  })
  test('renders French string when French is selected', () => {
    expect(component.text()).toMatch(/abandonner/i);
  })
  test('does not render as disabled after first guess', () => {
    expect(component.html()).not.toMatch(/disabled/i);
  })
  test('click triggers usePerformance hook', () => {
    mockUsePerformance.mockClear();
    giveUpButton.simulate('click');
    expect(mockUsePerformance).toHaveBeenCalled();
  })
})