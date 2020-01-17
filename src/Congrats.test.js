import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttribute } from '../test/testUtilities';
import Congrats from './Congrats';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';

/**
 * Factory function to create a ShallowWrapper for the Congrats component.
 * @function setup
 * @param {object} [testValues] - Context values specific to this setup.
 * @returns {ShallowWrapper} 
 */
const setup = ({ success, language }) => {
  language = language || 'en';
  success = success || false;

  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  )
}

test('renders without errors', () => {
  const wrapper = setup({});
  const component = findByTestAttribute(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});
test('renders no text when `success` is false', () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttribute(wrapper, 'component-congrats');
  expect(component.text()).toBe('');
});
test('renders non-empty congrats message when `success` is true', () => {
  const wrapper = setup({ success: true });
  const component = findByTestAttribute(wrapper, 'congrats-message');
  expect(component.text().length).not.toBe(0);
});

describe('LanguagePicker', () => {
  test('correctly renders congrats string in english', () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toContain('Congratulations')
  });
  test('correctly renders congrats string in emoji', () => {
    const wrapper = setup({ success: true, language: 'emoji' });
    expect(wrapper.text()).toBe('🎯🎉');
  });
});
