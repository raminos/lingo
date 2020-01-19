import React from 'react';
//component css
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
import Description from './Description';
import Nav from './Nav';
import Spinner from './Spinner';


const App = ({ initialState }) => {
  initialState = initialState || null;
  const [secretWord, setSecretWord] = React.useState(initialState);
  const [language] = languageContext.useLanguage();
  const setGuessedWords = guessedWordsContext.useGuessedWords()[1];

  React.useEffect(
    () => {
      hookActions.getSecretWord(setSecretWord, language);

      setGuessedWords([])
    }, [language, setGuessedWords]
  );

  return (
    <div
      data-test="component-app"
      className="container"
    >
      <div className="col-12 mt-3">
        <Nav>
          <LanguagePicker />
        </Nav>
        <Description />
        <Congrats />

        {secretWord ?
          <Input secretWord={secretWord} />
          :
          <Spinner />
        }
        <GuessedWords />
      </div>
    </div>
  );
}

export default App;
