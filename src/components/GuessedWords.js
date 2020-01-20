import React from 'react';
// css
import './GuessedWords.css';
// contexts
import guessedWordsContext from '../contexts/guessedWordsContext';
import languageContext from '../contexts/languageContext';
import stringModule from '../helpers/strings';


const GuessedWords = () => {
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  const [language] = languageContext.useLanguage();
  let componentContent;

  const createGuessedWordTableRow = (guessedWord, wordLength) => {
    const letterJsxArray = []

    for (let i = 0; i < wordLength; i++) {
      if (guessedWord.matchingLetters.matchingPositions[i]) {

        letterJsxArray.push(
          <span className="badge badge-success">
            {guessedWord.matchingLetters.matchingPositions[i]}
          </span>
        );
      } else if (guessedWord.matchingLetters.notMatchingPositions[i]) {

        letterJsxArray.push(
          <span className="badge badge-info">
            {guessedWord.matchingLetters.notMatchingPositions[i]}
          </span>
        );
      } else {

        letterJsxArray.push(
          <span className="badge badge-dark">
            {[...guessedWord.guessedWord][i]}
          </span>
        );
      }
    }
    return letterJsxArray.map((jsxLetter, letterIndex) => (
      <td key={letterIndex}>{jsxLetter}</td>
    ));
  }

  if (guessedWords.length === 0) {
    componentContent = (
      <p
        className="lead text-info text-center"
        data-test="guess-instructions">
        {stringModule.getStringByLanguage(language, 'guessPrompt')}
      </p>
    )
  } else {
    const guessedWordsRows = guessedWords.map((guessedWord, index) => {
      const guessedWordRow = createGuessedWordTableRow(guessedWord, 5);
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
    componentContent = (
      <div data-test="guessed-words">
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

  return (
    <div data-test="component-guessed-words">
      {componentContent}
    </div>
  );
};

export default GuessedWords;