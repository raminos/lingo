import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import languageContext from '../contexts/languageContext';

import Congrats from './Congrats';

/**
 * Factory function to create a ReactWrapper for the Congrats component.
 * @function setup
 * @param {string} [language = 'en'] - Sets languageContext to the needed setup.
 * @returns {Enzyme.ReactWrapper} A ReactWrapper of the isolated component in it's needed context.
 */
const setup = (language = 'en') => {
  return mount(
    <languageContext.LanguageProvider value={[language, jest.fn()]}>
      <Congrats />
    </languageContext.LanguageProvider>
  )
}

test('renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttribute(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});
test('renders congrats message', () => {
  const wrapper = setup();
  const component = findByTestAttribute(wrapper, 'congrats-message');
  expect(component.text().length).not.toBe(0);
});

describe('LanguagePicker', () => {
  test('correctly renders congrats string in english', () => {
    const wrapper = setup();
    expect(wrapper.text()).toMatch(/congratulations/i);
  });
  test('correctly renders congrats string in French', () => {
    const wrapper = setup('fr');
    expect(wrapper.text()).toMatch(/deviné/i);
  });
});
