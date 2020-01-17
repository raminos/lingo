// Based on the blog post 'Application State Management with React' by Kent C. Dodds
// https://kentcdodds.com/blog/application-state-management-with-react

import React from 'react';

const guessedWordsContext = React.createContext();

/**
 * @returns {array} - successContext calue, which is a state of [value, setter].
 */
const useGuessedWords = () => {

  const context = React.useContext(guessedWordsContext);

  if(!context) {
    throw new Error('useGuessedWords must be used within a GuessedWordsProvider');
  }

  return context;
}


/**
 * @param {object} props - props to pass through from declared component.
 * @returns {JSC.Element} - Provider component
 */
const GuessedWordsProvider = (props) => {
  const [guessedWords, setGuessedWords] = React.useState([]);

  const value = React.useMemo(() => [guessedWords, setGuessedWords], [guessedWords]);

  return <guessedWordsContext.Provider value={value} {...props} />;
}

export default { GuessedWordsProvider, useGuessedWords };