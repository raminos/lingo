import React from 'react';
import { shallow, mount } from 'enzyme';

import languageContext from './languageContext';

// a functional component that calls useLanguage for the tests
const FunctionalComponent = () => {
  languageContext.useLanguage();
  return <div />;
}

test('useLanguage throws error when not wrapped in LanguageProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow('useLanguage must be used within a LanguageProvider')
});
test('useLanguage does not throw error when wrapped in LanguageProvider', () => {
  expect(() => {
    mount(
      <languageContext.LanguageProvider>
        <FunctionalComponent />
      </languageContext.LanguageProvider>
    );
  }).not.toThrow();
});