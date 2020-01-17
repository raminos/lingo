import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttribute } from '../test/testUtilities';

import successContext from './contexts/successContext';
import Input from './Input';

const setup = (secretWord = 'party') => {
  const wrapper = mount(
    <successContext.SuccessProvider>
      <Input secretWord={secretWord} />
    </successContext.SuccessProvider>
  );

  const inputBox = findByTestAttribute(wrapper, 'input-box');
  const submitButton = findByTestAttribute(wrapper, 'submit-button');
  return [wrapper, inputBox, submitButton];
};

describe('test word guesses', () => {
  let wrapper;
  let inputBox;
  let submitButton;

  beforeEach(() => {
    [wrapper, inputBox, submitButton] = setup('party');
  });

  describe('correct guess', () => {
    beforeEach(() => {
      const mockEvent = { target: { value: 'party' } };
      inputBox.simulate('change', mockEvent);
      submitButton.simulate('click');
    })
    test('Input component contains no children', () => {
      const inputComponent = findByTestAttribute(wrapper, 'component-input');
      expect(inputComponent.children().length).toBe(0);
    })
  });

  describe('incorrect guess', () => {
    beforeEach(() => {
      const mockEvent = { target: { value: 'train' } };
      inputBox.simulate('change', mockEvent);
      submitButton.simulate('click');
    });
    test('Input box remains', () => {
      expect(inputBox.exists()).toBe(true);
    })
  })
})