import React from 'react';
import './App.css';

import hookActions from './actions/hookActions';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import Input from './Input';
import LanguagePicker from './LanguagePicker';




/**
 * Reducer to update state, called automatically by dispatch.
 * @param {object} state - existing state.
 * @param {object} action - contains 'type' and 'payload' properties for the 
 *                          state update.
 *                          i.e.: { type: 'setSecretWord', payload: 'party' }
 * @returns {object} - new state
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload };
    case 'setLanguage':
      return { ...state, language: action.payload };
    default:
      throw new Error(`invalid action type: ${action.type}`)
  }
}

const App = () => {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null, language: 'en' }
  )

  const setLanguage = (language) =>
    dispatch({ type: 'setLanguage', payload: language });
  const setSecretWord = (secretWord) =>
    dispatch({ type: 'setSecretWord', payload: secretWord });

  React.useEffect(
    () => { hookActions.getSecretWord(setSecretWord) }, []
  );

  if (!state.secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    );
  }

  return (
    <div
      data-test="component-app"
      className="container"
    >
      <h1>Jotto</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <guessedWordsContext.GuessedWordsProvider>
          <successContext.SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord} />
          </successContext.SuccessProvider>
          <GuessedWords />
        </guessedWordsContext.GuessedWordsProvider>
      </languageContext.Provider>
    </div>
  );
}

export default App;
