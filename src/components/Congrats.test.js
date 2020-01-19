import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttribute } from '../../test/testUtilities';
import Congrats from './Congrats';

import languageContext from '../contexts/languageContext';
import performanceContext from '../contexts/performanceContext';

/**
 * Factory function to create a ShallowWrapper for the Congrats component.
 * @function setup
 * @param {object} [testValues] - Context values specific to this setup.
 * @returns {ShallowWrapper} 
 */
const setup = ({ performance, language }) => {
  language = language || 'en';
  performance = performance || { success: true };

  return mount(
    <languageContext.LanguageProvider value={[language, jest.fn()]}>
      <performanceContext.PerformanceProvider value={[performance, jest.fn()]}>
        <Congrats />
      </performanceContext.PerformanceProvider>
    </languageContext.LanguageProvider>
  )
}

test('renders without errors', () => {
  const wrapper = setup({});
  const component = findByTestAttribute(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});
test('does not render when `success` is false', () => {
  const wrapper = setup({ performance: { success: false } });
  const component = findByTestAttribute(wrapper, 'component-congrats');
  expect(component.length).toBe(0);
});
test('renders non-empty congrats message when `success` is true', () => {
  const wrapper = setup({ performance: { success: true } });
  const component = findByTestAttribute(wrapper, 'congrats-message');
  expect(component.text().length).not.toBe(0);
});

describe('LanguagePicker', () => {
  test('correctly renders congrats string in english', () => {
    const wrapper = setup({ performance: { success: true } });
    expect(wrapper.text()).toContain('Congratulations')
  });
  test('correctly renders congrats string in French', () => {
    const wrapper = setup({ performance: { success: true } , language: 'fr' });
    expect(wrapper.text()).toContain('deviné');
  });
});
