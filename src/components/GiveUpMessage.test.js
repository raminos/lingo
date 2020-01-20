import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import GiveUpMessage from './GiveUpMessage';

import languageContext from '../contexts/languageContext';

/**
 * Factory function to create a ShallowWrapper for the GiveUpMessage component.
 * @function setup
 * @param {string} [language] - Language code specific to this setup.
 * @returns {ReactWrapper} 
 */
const setup = (language = 'en') => {
  return mount(
    <languageContext.LanguageProvider value={[language, jest.fn()]}>
      <GiveUpMessage />
    </languageContext.LanguageProvider>
  )
}

test('renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttribute(wrapper, 'component-give-up-message');
  expect(component.length).toBe(1);
});
test('renders message', () => {
  const wrapper = setup();
  const component = findByTestAttribute(wrapper, 'give-up-message');
  expect(component.text().length).not.toBe(0);
});

describe('LanguagePicker', () => {
  test('correctly renders string in English', () => {
    const wrapper = setup();
    expect(wrapper.text()).toMatch(/end/i)
  });
  test('correctly renders string in French', () => {
    const wrapper = setup('fr');
    expect(wrapper.text()).toMatch(/arrêter/i);
  });
});
