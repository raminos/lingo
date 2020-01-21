import React from 'react';

import Enzyme, { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import languageContext from '../contexts/languageContext';

import Explanation from './Explanation';

/**
 * Factory function to create a ReactWrapper for the Explanation component.
 * @function setup
 * @param {string} [language = 'en'] - Sets language context to needed setup.
 * @returns {Enzyme.ReactWrapper} A ReactWrapper of the isolated component in it's needed context.
 */
const setup = (language = 'en') => {
  const wrapper = mount(
    <languageContext.LanguageProvider value={[language, jest.fn()]}>
      <Explanation />
    </languageContext.LanguageProvider>
  )
  const component = findByTestAttribute(wrapper, 'component-explanation');
  return [wrapper, component];
}
describe('Rendering of the component', () => {
  let wrapper
  let component
  beforeEach(() => {
    [wrapper, component] = setup();
  });
  test('renders without errors', () => {
    expect(component.length).toBe(1);
  });
  test('renders explanation message', () => {
    expect(component.text().length).not.toBe(0);
  });
  test('does not render after clicking on the close button', () => {
    const closeButton = findByTestAttribute(wrapper, 'close-button');
    closeButton.simulate('click');
    
    // check for the html inside, because the Wrapper gets still rendered.
    expect(wrapper.html()).toBe('');
  });
});

describe('LanguagePicker', () => {
  test('correctly renders explanation string in english', () => {
    const [wrapper] = setup();
    expect(wrapper.text()).toMatch(/secret word/i)
  });
  test('correctly renders explanation string in French', () => {
    const [wrapper] = setup('fr');
    expect(wrapper.text()).toMatch(/mot secret/i);
  });
});
