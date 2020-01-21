import React from 'react';

import './GuessedWords.css';

import guessedWordsContext from '../contexts/guessedWordsContext';
import languageContext from '../contexts/languageContext';
import stringModule from '../helpers/strings';

/**
 * Functional React component for a table of the user's guesses.
 * @function GuessedWords
 * @returns {JSX.Element} A Rendered component
 */
const GuessedWords = () => {
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  const [language] = languageContext.useLanguage();

  /**
   * @function createGuessedWordTableRow
   * @param {Object} guessedWordEntry - An object of the processed user's
   * guess.
   * @param {string} guessedWordEntry.guessedWord - The guessed Word.
   * @param {Object} guessedWordEntry.matchingLetters.matchingPositions - An
   * object of all the guess' letters that match in position to the secret
   * word. Key: position of the letter, value: letter
   * @param {Object} guessedWordEntry.matchingLetters.notMatchingPositions -
   * An object of all the guess' letters that match, but are not in the same
   * position as in the secret word. Key: position of the letter in guessed
   * word, value: letter
   * @param {number} wordLength - The allowed word length.
   * @returns {JSX.Element} The processed letters in word order inside td tags.
   */
  const createGuessedWordTableRow = (guessedWordEntry, wordLength) => {
    /**
     * An Array that holds the word's letters with their needed html tags
     * and classes.
     * @constant letterJsxArray
     * @type {JSX.Element[]}
     */
    const letterJsxArray = []

    /**
     * Selects next matching letter from category and adds JSX
     */
    for (let i = 0; i < wordLength; i++) {
      if (guessedWordEntry.matchingLetters.matchingPositions[i]) {

        letterJsxArray.push(
          <span className="badge badge-success">
            {guessedWordEntry.matchingLetters.matchingPositions[i]}
          </span>
        );
      } else if (guessedWordEntry.matchingLetters.notMatchingPositions[i]) {

        letterJsxArray.push(
          <span className="badge badge-info">
            {guessedWordEntry.matchingLetters.notMatchingPositions[i]}
          </span>
        );
      } else {

        letterJsxArray.push(
          <span className="badge badge-dark">
            {[...guessedWordEntry.guessedWord][i]}
          </span>
        );
      }
    }
    return letterJsxArray.map((jsxLetter, letterIndex) => (
      <td key={letterIndex}>{jsxLetter}</td>
    ));
  }

  /**
   * Variable for all the table body's table rows.
   * @constant guessedWordRows
   * @type {JSX.Element}
   */
  const guessedWordsRows = guessedWords.map((guessedWordEntry, index) => {
    const guessedWordRow = createGuessedWordTableRow(guessedWordEntry, 5);
    return (
      <tr data-test="guessed-word" key={index}>
        <td>
          <span className="badge badge-light">
            {index + 1}
          </span>
        </td>
        {guessedWordRow}
      </tr>
    )
  });
  
  return (
    <div data-test="component-guessed-words">
      <h3 className="mb-3">
        {stringModule.getStringByLanguage(language, 'guessColumnHeader')}
      </h3>
      <div className="table-wrapper">
        <table className="table text-center">
          <thead className="thead-light">
            <tr>
              <th scope="col"><span className="badge badge-secondary">#</span></th>
              <th scope="col"><span className="badge badge-secondary">1</span></th>
              <th scope="col"><span className="badge badge-secondary">2</span></th>
              <th scope="col"><span className="badge badge-secondary">3</span></th>
              <th scope="col"><span className="badge badge-secondary">4</span></th>
              <th scope="col"><span className="badge badge-secondary">5</span></th>
            </tr>
          </thead>
          <tbody>
            {guessedWordsRows}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GuessedWords;