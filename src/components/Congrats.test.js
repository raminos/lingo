import React from 'react';

import { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import languageContext from '../contexts/languageContext';

import Congrats from './Congrats';

/**
 * Factory function to create a ShallowWrapper for the Congrats component.
 * @function setup
 * @param {string} [language] - Language code specific to this setup.
 * @returns {ReactWrapper} 
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
    expect(wrapper.text()).toMatch(/Congratulations/i);
  });
  test('correctly renders congrats string in French', () => {
    const wrapper = setup('fr');
    expect(wrapper.text()).toMatch(/deviné/i);
  });
});
