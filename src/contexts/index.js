import React from 'react';
import languageContext from './languageContext';
import successContext from './successContext';
import guessedWordsContext from './guessedWordsContext';

const AppContext = ({ children }) => {
  return (
    <languageContext.LanguageProvider>
      <successContext.SuccessProvider >
        <guessedWordsContext.GuessedWordsProvider >
          {children}
        </guessedWordsContext.GuessedWordsProvider>
      </successContext.SuccessProvider>
    </languageContext.LanguageProvider>
  )
};

export default AppContext;