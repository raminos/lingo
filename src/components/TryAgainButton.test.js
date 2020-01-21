import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import languageContext from '../contexts/languageContext';
import performanceContext from '../contexts/performanceContext';

import TryAgainButton from './TryAgainButton';


/**
 * Spy function to test, whether the button has called setPerformance.
 */
const mockSetPerformance = jest.fn();

/**
 * Factory function to create a ReactWrapper for the TryAgainButton component.
 * @function setup
 * @param {Object} context - Incorporates all contexts' states.
 * @param {Object} [context.performance] - Sets performanceContext to 
 * the needed setup.
 * @param {string} [context.language = 'en'] - Sets languageContext to 
 * the needed setup.
 * @returns {Enzyme.ReactWrapper} A ReactWrapper of the isolated component in it's needed contexts.
 */
const setup = ({ performance, language }) => {
  performance = performance || { success: false, giveUp: false };
  language = language || 'en';

  const wrapper = mount(
    <languageContext.LanguageProvider value={[language, jest.fn()]}>
      <performanceContext.PerformanceProvider value={[performance, mockSetPerformance]}>
        <TryAgainButton />
      </performanceContext.PerformanceProvider>
    </languageContext.LanguageProvider>
  );

  const component = findByTestAttribute(wrapper, 'component-try-again-button');
  const tryAgainButton = findByTestAttribute(wrapper, 'try-again-button')

  return [component, tryAgainButton];
}

describe('Behaviour in default setup', () => {
  let component;
  let tryAgainButton;
  beforeEach(() => {
    [component, tryAgainButton] = setup({});
  });
  test('renders without errors', () => {
    expect(component.length).toBe(1);
  });
  test('renders English string', () => {
    expect(component.text()).toMatch(/try again/i);
  });
  test('click triggers usePerformance hook', () => {
    mockSetPerformance.mockClear();
    tryAgainButton.simulate('click');
    expect(mockSetPerformance).toHaveBeenCalled();
  });
});

test('renders French string when French is selected', () => {
  const [component] = setup({ language: 'fr' })
  expect(component.text()).toMatch(/nouveau/i);
});