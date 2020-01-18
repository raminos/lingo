import React from 'react';
import './App.css';

// helpers
import hookActions from './actions/hookActions';

// contexts
import languageContext from './contexts/languageContext';
import guessedWordsContext from './contexts/guessedWordsContext';

// components
import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import Input from './Input';
import LanguagePicker from './LanguagePicker';


const App = ({ initialState }) => {
  initialState = initialState || null;
  const [secretWord, setSecretWord] = React.useState(initialState);
  const [language] = languageContext.useLanguage();
  const setGuessedWords = guessedWordsContext.useGuessedWords()[1];

  React.useEffect(
    () => {
      hookActions.getSecretWord(setSecretWord, language);

      setGuessedWords([])
    }, [language]
  );

  if (!secretWord) {
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
      <h1><a href="/">Lingo</a></h1>
      <LanguagePicker />
      <Congrats />
      <Input secretWord={secretWord} />
      <GuessedWords />
    </div>
  );
}

export default App;
