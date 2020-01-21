import React from 'react';
import PropTypes from 'prop-types';
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

AppContext.propTypes = {
  children: PropTypes.node.isRequired
};


export default AppContext;