import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttribute } from '../test/testUtilities';

import languageContext from './contexts/languageContext';

import Description from './Description';

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