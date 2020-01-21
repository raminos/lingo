import React, { useEffect, useState } from 'react';
// css
import './App.css';

// helpers
import hookActions from '../actions/hookActions';
import stringModule from '../helpers/strings';

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
import InfoMessage from './InfoMessage';

/**
 * Functional React component to manage the appearance of components based on the app's contexts.
 * @function App
 * @param {string} props.initialState -  Serves as a way to test the component
 * @returns {JSX.Element} - completely assimilated body 
 */
const App = ({ initialState = null }) => {
  const [performance, setPerformance] = performanceContext.usePerformance();
  const [secretWord, setSecretWord] = useState(initialState);
  const [language] = languageContext.useLanguage();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();

  /**
   * fetches the secret word and sets the context based on the change
   * of the language and performance variables.
   */
  useEffect(() => {
    if (!performance.success && !performance.giveUp) {
      hookActions.getSecretWord(setSecretWord, language);
      setGuessedWords([]);
    }
  }, [language, performance, setGuessedWords]);

  useEffect(() => {
    setPerformance({ type: 'reset' });
  }, [language, setPerformance]);

  /**
   * Serves the needed components based on the state of performanceContext.
   * @function performanceDependendContent
   * @returns {JSX.Element} 
   */
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

  /**
   * Complete body of the app.
   */
  return (
    <div data-test="component-app" className="container px-5">
      <div className="row">
        <div className="col-12 mt-3">
          <Nav>
            <LanguagePicker />
          </Nav>
          <Description />
          <div className="text-center my-3">
            {
              secretWord ?
                performanceDependendContent()
                :
                <Spinner>
                  {stringModule.getStringByLanguage(language, 'loading')}
                </Spinner>
            }
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {
            // this coniditional renders the Explanation component only
            // when there are guessedWords but no performance endpoint.
            !performance.success &&
            !performance.giveUp &&
            (guessedWords.length !== 0) &&
            <Explanation />
          }
          {
            (guessedWords.length === 0) ?
              <InfoMessage>
                {stringModule.getStringByLanguage(language, 'guessPrompt')}
              </InfoMessage>
              :
              <GuessedWords />
          }
        </div>
      </div>
    </div >
  );
}

export default App;