import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import languageContext from '../contexts/languageContext';

import Description from './Description';

/**
 * Factory function to create a ReactWrapper for the Description component.
 * @function setup
 * @param {string} [language = 'en'] - Sets language context to needed setup.
 * @returns {Enzyme.ReactWrapper} A ReactWrapper of the isolated component in it's needed context.
 */
const setup = (language = 'en') => {
  const wrapper = mount(
    <languageContext.LanguageProvider value={[language, jest.fn()]}>
      <Description />
    </languageContext.LanguageProvider>
  );

  const component = findByTestAttribute(wrapper, 'component-description');
  return component;
}

test('renders without errors', () => {
  const descriptionComponent = setup();
  expect(descriptionComponent.exists()).toBe(true);
});
test('displays text by default in English', () => {
  const descriptionComponent = setup();
  expect(descriptionComponent.text()).toMatch(/game/i);
});
test('displays expected text in French', () => {
  const descriptionComponent = setup('fr');
  expect(descriptionComponent.text()).toMatch(/jeu/i);
});