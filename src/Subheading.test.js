import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttribute } from '../test/testUtilities';

import languageContext from './contexts/languageContext';

import Subheading from './Subheading';

const setup = (language = 'en') => {
  const wrapper = mount(
    <languageContext.LanguageProvider value={[language, jest.fn()]}>
      <Subheading />
    </languageContext.LanguageProvider>
  );

  const component = findByTestAttribute(wrapper, 'component-subheading');
  return component;
}

test('renders without errors', () => {
  const subheadingComponent = setup();
  expect(subheadingComponent.exists()).toBe(true);
});
test('displays text by default in English', () => {
  const subheadingComponent = setup();
  expect(subheadingComponent.text()).toMatch(/game/i);
});
test('displays expected text in French', () => {
  const subheadingComponent = setup('fr');
  expect(subheadingComponent.text()).toMatch(/jeu/i);
});