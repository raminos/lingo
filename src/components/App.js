import React from 'react';
// css
import './App.css';

// helpers
import hookActions from '../actions/hookActions';

// contexts
import languageContext from '../contexts/languageContext';
import guessedWordsContext from '../contexts/guessedWordsContext';
import performanceContext from '../contexts/performanceContext';

// components
import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import Input from './Input';
import LanguagePicker from './LanguagePicker';
import Description from './Description';
import Nav from './Nav';
import Spinner from './Spinner';
import GiveUpButton from './GiveUpButton';
import GiveUpMessage from './GiveUpMessage';
import TryAgainButton from './TryAgainButton';
import Explanation from './Explanation';

const App = ({ initialState = null }) => {
  const [performance] = performanceContext.usePerformance();
  const [secretWord, setSecretWord] = React.useState(initialState);
  const [language] = languageContext.useLanguage();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();

  React.useEffect(
    () => {
      if (!performance.success && !performance.giveUp) {
        hookActions.getSecretWord(setSecretWord, language);
        setGuessedWords([]);
      }
    }, [language, setGuessedWords, performance]
  );

  const performanceDependendContent = () => {
    if (performance.success) return (
      <>
        <Congrats />
        <TryAgainButton />
      </>
    )

    else if (performance.giveUp) return (
      <>
        <GiveUpMessage>
          {secretWord}
        </GiveUpMessage>
        <TryAgainButton />
      </>
    );

    else return (
      <div className="d-flex offset-1 justify-content-center my-4">
        <Input secretWord={secretWord} />
        <GiveUpButton />
      </div>
    );
  }

  return (
    <div data-test="component-app" className="container px-5">
      <div className="row">
        <div className="col-12 mt-3">
          <Nav>
            <LanguagePicker />
          </Nav>
          <Description />
          {secretWord ?
            <div className="text-center my-3">
              {performanceDependendContent()}
            </div>
            :
            <Spinner />
          }
        </div>
      </div>
      <div className="row">
        <div className="col">
          {
            !performance.success &&
            !performance.giveUp &&
            (guessedWords.length !== 0) &&
            <Explanation />
          }
          <GuessedWords />
        </div>
      </div>
    </div >
  );
}

export default App;
