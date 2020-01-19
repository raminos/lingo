import React from 'react';
import Proptypes from 'prop-types';

import guessedWordsContext from './contexts/guessedWordsContext';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import stringsModule from './helpers/strings';
import { getMatchingLetters } from './helpers';

const Input = ({ secretWord }) => {
  const [language] = languageContext.useLanguage();
  const [success, setSuccess] = successContext.useSuccess();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();
  const [currentGuess, setCurrentGuess] = React.useState("");

  if (success) return null;

  const handleClick = (event) => {
    event.preventDefault();
    // return in case of empty submit
    if (currentGuess === '') return null;
    // show Congrats component in case of correctly guessed word
    if (currentGuess === secretWord) setSuccess(true);

    // update guessedWords context with new entry
    const matchingLetters = getMatchingLetters(currentGuess, secretWord);
    const newGuessedWords = [...guessedWords, { guessedWord: currentGuess, matchingLetters }];
    setGuessedWords(newGuessedWords);

    // clear input box
    return setCurrentGuess('');
  }

  return (
    <form>
      <div
        className="row justify-content-center"
        data-test="component-input"
      >
        <div className="input-group my-3 col-8 ">
          <input
            data-test="input-box"
            className="form-control"
            type="text"
            maxLength="5"
            placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
            value={currentGuess}
            onChange={(event) => setCurrentGuess(event.target.value)}
          />
          <div className="input-group-append">
            <button
              data-test="submit-button"
              className="btn btn-secondary"
              type="submit"
              onClick={handleClick}
            >
              {stringsModule.getStringByLanguage(language, 'submit')}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

Input.propTypes = {
  secretWord: Proptypes.string.isRequired
}

export default Input;