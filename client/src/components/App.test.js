import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { findByTestAttribute } from '../../test/testUtilities';

import App from './App';

import hookActions from '../actions/hookActions';
import AppContext from '../contexts';

/**
 * mock function to spy on the usage of getSecretWord function.
 * @function mockGetSecretWord
 */
const mockGetSecretWord = jest.fn();

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {string} [secretWord ='party'] - desired test value for the secretWord state 
 * @returns {Enzyme.ReactWrapper} a ReactWrapper of the isolated component in it's needed contexts.
 */
const setup = (secretWord = "party") => {
  
  // clear the mock function for every test
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

    // selecting the elements needed
    const inputBox = findByTestAttribute(wrapper, 'input-box');
    const submitButton = findByTestAttribute(wrapper, 'submit-button');

    // simulate an attempt to guess the secret word
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