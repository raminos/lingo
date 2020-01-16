import React from 'react';
import './App.css';

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import Input from './Input';
import hookActions from './actions/hookActions';


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
    default:
      throw new Error(`invalid action type: ${action.type}`)
  }
}

const App = () => {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null }
  )

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
      <Input secretWord={state.secretWord} />
      <Congrats success={true} />
      <GuessedWords guessedWords={[
        { guessedWord: 'train', letterMatchCount: 3 }
      ]} />
    </div>
  );
}

export default App;
