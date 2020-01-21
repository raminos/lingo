import React from 'react';
import Proptypes from 'prop-types';


import guessedWordsContext from '../contexts/guessedWordsContext';
import languageContext from '../contexts/languageContext';
import performanceContext from '../contexts/performanceContext';
import stringModule from '../helpers/strings';
import { getMatchingLetters } from '../helpers';

/**
 * Functional React component to display a controlled input field and submit button
 * @function Input
 * @param {Object} props - React props.
 * @param {string} secretWord - The secret word.
 * @returns {JSX.Element} Rendered React component 
 */
const Input = ({ secretWord }) => {
  const [language] = languageContext.useLanguage();
  const [, setPerformance] = performanceContext.usePerformance();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();

  /**
   * React state hook to manage the input field
   * @type {[string, Function]}
   */
  const [currentGuess, setCurrentGuess] = React.useState("");

  /**
   * Checks if only allowed characters are used in the string.
   * @function isOnlyLetters
   * @param {string} string
   * @returns {boolean}
   */
  const isOnlyLetters = (string) => {
    const allowedCharacters = /^[a-zßäáàâçéèêëìíîïöœüúûù´`^¨]*$/i
    if (string.match(allowedCharacters)) return true;
    else return false;
  }

  /**
   * Checks whether the currentGuess is 5 characters long
   * @function isFiveLettersLong
   * @returns {boolean}
   */
  const isFiveLettersLong = () => {
    if (currentGuess.length === 5) return true;
    else return false;
  }

  /**
   * Handles changes in the input field.
   * @function handleClick
   * @param {React.SyntheticEvent} event - A SyntheticEvent of the input field.
   * @returns {string} Calls the currentGuess setter function with the tagets value.
   */
  const handleChange = (event) => {
    if (isOnlyLetters(event.target.value))
      return setCurrentGuess(event.target.value);
  }

  /**
   * Handles click event of the submit button.
   * @function handleClick
   * @param {React.SyntheticEvent} event - A SyntheticEvent of the button.
   * @returns {string} Sets an empty string as the currentGuess.
   */
  const handleClick = (event) => {
    event.preventDefault();
    
    // return in case of incomplete submit
    if (currentGuess.length < 5) return null;
    
    // change the performance state according to the correct guess
    if (currentGuess === secretWord) setPerformance({ type: 'success' });

    // update guessedWords context with new entry
    const matchingLetters = getMatchingLetters(currentGuess, secretWord);
    const newGuessedWords = [...guessedWords, { guessedWord: currentGuess, matchingLetters }];
    setGuessedWords(newGuessedWords);

    // clear input field
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
            placeholder={stringModule.getStringByLanguage(language, 'guessInputPlaceholder')}
            value={currentGuess}
            onChange={(event) => handleChange(event)}
          />
          <div className="input-group-append">
            <button
              data-test="submit-button"
              className={`btn btn-secondary ${isFiveLettersLong() ? '' : 'disabled'}`}
              type="submit"
              onClick={(event) => handleClick(event)}
            >
              {stringModule.getStringByLanguage(language, 'submit')}
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