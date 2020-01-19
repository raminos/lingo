import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import Spinner from './Spinner';
import languageContext from '../contexts/languageContext';

const setup = (language = 'en') => {
  const wrapper = mount(
    <languageContext.LanguageProvider value={[language, jest.fn()]}>
      <Spinner />
    </languageContext.LanguageProvider>
  );
  const component = findByTestAttribute(wrapper, 'component-spinner');
  return component;
}

test('renders without errors', () => {
  const spinnerComponent = setup();
  expect(spinnerComponent.exists()).toBe(true);
});
test('displays expected text in French', () => {
  const spinnerComponent = setup('fr');
  expect(spinnerComponent.text()).toMatch(/chargement/i);
});