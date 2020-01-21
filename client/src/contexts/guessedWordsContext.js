// Based on the blog post 'Application State Management with React' by Kent C. Dodds
// https://kentcdodds.com/blog/application-state-management-with-react

import React from 'react';

const guessedWordsContext = React.createContext();

/**
 * Initializes useContext hook and throws error if function is used outside of 
 * the provider's scope
 * @function useGuessedWords
 * @returns {Array} guessedWordsContext value, which is a state of [value, setter].
 */
const useGuessedWords = () => {

  const context = React.useContext(guessedWordsContext);

  if (!context) {
    throw new Error('Error: useGuessedWords must be used within a GuessedWordsProvider');
  }

  return context;
}


/**
 * Provider function for the guessedWordsContext. Uses the useMemo hook to not
 * update unnecessarily.
 * @function GuessedWordsProvider
 * @param {object} props - props to pass through from declared component.
 * @returns {JSX.Element} - Provider component.
 */
const GuessedWordsProvider = (props) => {
  
  /**
   * The guessedWords object serves to store the guessedWord and an object of
   * it's matching letters with the secret word.
   * @constant guessedWords
   * @type {Object[]}
   * @example Example structure of an Object inside the Array.
   * [{...},{
    "guessedWord": "word",
    "matchingLetters": {
      "matchingPositions": {
        "0": "w",
        "1": "o",
      },
      "notMatchingPositions": {
        "4": "d",
      }
    },{...}]
   */
  const [guessedWords, setGuessedWords] = React.useState([]);

  const value = React.useMemo(() => [guessedWords, setGuessedWords], [guessedWords]);

  return <guessedWordsContext.Provider value={value} {...props} />;
}

export default { GuessedWordsProvider, useGuessedWords };