import React from 'react';
import Proptypes from 'prop-types';

import guessedWordsContext from '../contexts/guessedWordsContext';
import languageContext from '../contexts/languageContext';
import performanceContext from '../contexts/performanceContext';
import stringsModule from '../helpers/strings';
import { getMatchingLetters } from '../helpers';

const Input = ({ secretWord }) => {
  const [language] = languageContext.useLanguage();
  const [performance, setPerformance] = performanceContext.usePerformance();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();
  const [currentGuess, setCurrentGuess] = React.useState("");

  if (performance.success || performance.giveUp) return null;

  const isOnlyLetters = (string) => {
    const allowedCharacters = /^[a-zA-ZßüÜöÖäÄáàéèìíúêçëîïûùœâ´`^]*$/i
    
    if (string.match(allowedCharacters)) return true;
    else return false;
  }

  const isFiveLettersLong = () => {
    if (currentGuess.length === 5 ) return true;
    else return false;
  }

  const handleChange = (event) => {
    if (isOnlyLetters(event.target.value))
      return setCurrentGuess(event.target.value);
  }

  const handleClick = (event) => {
    event.preventDefault();
    // return in case of empty submit
    if (currentGuess.length < 5) return null;

    // show Congrats component in case of correctly guessed word
    if (currentGuess === secretWord) setPerformance({ type: 'success' });

    // update guessedWords context with new entry
    const matchingLetters = getMatchingLetters(currentGuess, secretWord);
    const newGuessedWords = [...guessedWords, { guessedWord: currentGuess, matchingLetters }];
    setGuessedWords(newGuessedWords);

    // clear input box
    return setCurrentGuess('');
  }

  return (
    <div className="col-9 mr-4">
      <form
        data-test="component-input"
      >
        <div className="input-group mx-3">
          <input
            data-test="input-box"
            className="form-control input-medium"
            type="text"
            maxLength="5"
            placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
            value={currentGuess}
            onChange={(event) => handleChange(event)}
          />
          <div className="input-group-append">
            <button
              data-test="submit-button"
              className={`btn btn-secondary ${isFiveLettersLong()? '' : 'disabled'}`} 
              type="submit"
              onClick={(event) => handleClick(event)}
            >
              {stringsModule.getStringByLanguage(language, 'submit')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: Proptypes.string.isRequired
}

export default Input;