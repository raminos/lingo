import React from 'react';
import './GuessedWords.css';

import guessedWordsContext from '../contexts/guessedWordsContext';
import languageContext from '../contexts/languageContext';
import stringModule from '../helpers/strings';

const GuessedWords = () => {
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  const [language] = languageContext.useLanguage();
  const [visible, setVisibility] = React.useState(true);
  let contents;

  React.useEffect(
    () => {
      setVisibility(true);
    }, [language]
  );

  if (guessedWords.length === 0) {
    contents = (
      <p
        className="lead text-info text-center"
        data-test="guess-instructions">
        {stringModule.getStringByLanguage(language, 'guessPrompt')}
      </p>
    )
  } else {
    const guessedWordsRows = guessedWords.map((word, index) => {
      const tableDataArray = [];

      for (let key = 0; key < 5; key++) {
        if (word.matchingLetters.matchingPositions[key]) {
          tableDataArray.push(
            <span className="badge badge-success">
              {word.matchingLetters.matchingPositions[key]}
            </span>
          );
        } else if (word.matchingLetters.notMatchingPositions[key]) {
          tableDataArray.push(
            <span className="badge badge-info">
              {word.matchingLetters.notMatchingPositions[key]}
            </span>
          );
        } else {
          tableDataArray.push(
            <span className="badge badge-dark">
              {[...word.guessedWord][key]}
            </span>
          );
        }
      }
      return (
        <tr
          data-test="guessed-word"
          key={index}
        >
          <td>
            <span className="badge badge-light">
              {index + 1}
            </span>
          </td>
          {
            tableDataArray.map((entry, entryIndex) =>
              <td key={entryIndex}>{entry}</td>
            )
          }
        </tr>
      )
    });

    contents = (
      <div data-test="guessed-words">
        {visible &&
          <div class="alert alert-warning alert-dismissible" role="alert">
            {stringModule.getStringByLanguage(language, 'tableExplanation')}
            <button
              type="button"
              className="close"
              onClick={() => setVisibility(false)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }
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

      {contents}
    </div>
  );
};

export default GuessedWords;