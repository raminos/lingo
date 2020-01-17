import React from 'react';
import Proptypes, { string } from 'prop-types';

import guessedWordsContext from './contexts/guessedWordsContext';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import stringsModule from './helpers/strings';
import { getLetterMatchCount } from './helpers';

const Input = ({ secretWord }) => {
  const language = React.useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();
  const [currentGuess, setCurrentGuess] = React.useState("");

  if (success) return null;

  return (
    <div data-test="component-input">
      <form className="form-inline" >
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
            const newGuessedWords = [...guessedWords, { guessedWord: currentGuess, letterMatchCount }];
            setGuessedWords(newGuessedWords);
            if (currentGuess === secretWord) {
              setSuccess(true);
            }


            // clear input box
            setCurrentGuess('')
          }}
        >
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: Proptypes.string.isRequired
}

export default Input;