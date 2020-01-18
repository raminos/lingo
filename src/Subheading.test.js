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

  const subheadingComponent = findByTestAttribute(wrapper, 'component-subheading');
  return subheadingComponent;
}

test('renders without errors', () => {
  const subheadingComponent = setup();
  expect(subheadingComponent.exists()).toBe(true);
});
test('displays text by default in English', () => {
  const subheadingComponent = setup();
  expect(subheadingComponent.text()).toContain('game');
});
test('displays text upon language change in French', () => {
  const subheadingComponent = setup('fr');
  expect(subheadingComponent.text()).toContain('jeu');
});