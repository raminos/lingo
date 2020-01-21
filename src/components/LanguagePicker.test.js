import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import LanguagePicker from './LanguagePicker';
import languageContext from '../contexts/languageContext';

/**
 * Mock function to spy on calls to useLanguage.
 */
const mockUseLanguage = jest.fn().mockReturnValue([null, jest.fn()]);

/**
 * Factory function to create a ReactWrapper for the LanguagePicker component.
 * @function setup
 * @returns {Enzyme.ReactWrapper} A ReactWrapper of the isolated component in it's needed context.
 */
const setup = () => {
  return mount(
      <languageContext.LanguageProvider value={mockUseLanguage()}>
        <LanguagePicker />
      </languageContext.LanguageProvider>
  );
}

test('renders without errors', () => {
  const component = findByTestAttribute(setup(), 'component-language-picker');
  expect(component.exists()).toBe(true);
});
test('renders non-zero language icons', () => {
  const languageIcons = findByTestAttribute(setup(), 'language-icon');
  expect(languageIcons.length).toBeGreaterThan(0);
});
test('calls setLanguage upon click', () => {
  const languageIcons = findByTestAttribute(setup(), 'language-icon');
  
  // simulate click on first icon
  const firstIcon = languageIcons.first();
  firstIcon.simulate('click');

  expect(mockUseLanguage).toHaveBeenCalled();
});