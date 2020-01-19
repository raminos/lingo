import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';
import App from './App';

import hookActions from '../actions/hookActions';
import AppContext from '../contexts';
import { act } from 'react-dom/test-utils';

const mockGetSecretWord = jest.fn();
/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {string} secretWord - desired secretWord state value for test
 * @returns {ReactWrapper}
 */
const setup = (secretWord = "party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord

  return mount(
    <AppContext>
      <App initialState={secretWord} />
    </AppContext>);
};

test('renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttribute(wrapper, 'component-app');
  expect(component.exists()).toBe(true);
});

describe('getSecretWord calls', () => {
  test('getSecretWord gets called on App mount', () => {
    setup();

    // check to see if secret word was updated
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
  test('secretWord does not update on App update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    const mockEvent = { target: { value: 'train' } };
    const inputBox = findByTestAttribute(wrapper, 'input-box');
    const submitButton = findByTestAttribute(wrapper, 'submit-button');

    inputBox.simulate('change', mockEvent);
    submitButton.simulate('click', { preventDefault() { } });

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe('secretWord is not null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup('party');
  })
  test('renders app when secretWord is not null', () => {
    const appComponent = findByTestAttribute(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(true);
  });
  test('does not render spinner when secretWord is not null', () => {
    const spinnerComponent = findByTestAttribute(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe('secretWord is null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  })
  test('does not render input component when secretWord is null', () => {
    const appComponent = findByTestAttribute(wrapper, 'component-input');
    expect(appComponent.exists()).toBe(false);
  });
  test('renders spinner when secretWord is null', () => {
    const spinnerComponent = findByTestAttribute(wrapper, 'component-spinner');
    expect(spinnerComponent.exists()).toBe(true);
  });
});