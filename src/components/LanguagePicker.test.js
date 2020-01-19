import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import LanguagePicker from './LanguagePicker';
import languageContext from '../contexts/languageContext';
import performanceContext from '../contexts/performanceContext';

const mockUseLanguage = jest.fn().mockReturnValue([null, jest.fn()]);

const setup = () => {
  return mount(
    <performanceContext.PerformanceProvider>
      <languageContext.LanguageProvider value={mockUseLanguage()}>
        <LanguagePicker />
      </languageContext.LanguageProvider>
    </performanceContext.PerformanceProvider>
  );
}

test('renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttribute(wrapper, 'component-language-picker');
  expect(component.exists()).toBe(true);
});
test('renders non-zero language icons', () => {
  const wrapper = setup();
  const languageIcons = findByTestAttribute(wrapper, 'language-icon');
  expect(languageIcons.length).toBeGreaterThan(0);
});
test('calls setLanguage upon click', () => {
  const wrapper = setup();
  const languageIcons = findByTestAttribute(wrapper, 'language-icon');

  const firstIcon = languageIcons.first();
  firstIcon.simulate('click');

  expect(mockUseLanguage).toHaveBeenCalled();
});