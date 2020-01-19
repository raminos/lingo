import React from 'react';
import languageContext from './languageContext';
import performanceContext from './performanceContext';
import guessedWordsContext from './guessedWordsContext';

const AppContext = ({ children }) => {
  return (
    <languageContext.LanguageProvider>
      <performanceContext.PerformanceProvider >
        <guessedWordsContext.GuessedWordsProvider >
          {children}
        </guessedWordsContext.GuessedWordsProvider>
      </performanceContext.PerformanceProvider>
    </languageContext.LanguageProvider>
  )
};

export default AppContext;