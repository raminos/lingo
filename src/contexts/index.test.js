import React from 'react';
import { mount, shallow } from 'enzyme';

// contexts
import AppContext from './'; 
import languageContext from './languageContext';
import performanceContext from './performanceContext';
import guessedWordsContext from './guessedWordsContext';

const FunctionalComponent = () => {
  languageContext.useLanguage();
  performanceContext.usePerformance();
  guessedWordsContext.useGuessedWords();

  return (
      <div />
  )
}

test('A Context inside AppContext throws an error when consuming function is not wrapped in AppContext', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow(/error/i);
});
test('Contexts inside AppContext do not throw error when consuming function is wrapped in AppContext', () => {
  expect(() => {
    mount(
      <AppContext>
        <FunctionalComponent />
      </AppContext>
    );
  }).not.toThrow();
});