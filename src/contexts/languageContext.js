// Based on the blog post 'Application State Management with React' by Kent C. Dodds
// https://kentcdodds.com/blog/application-state-management-with-react

import React from 'react';
const languageContext = React.createContext();

/**
 * Initializes useContext hook and throws error if function is used outside of 
 * the provider's scope.
 * @function useLanguage
 * @returns {Array} languageContext value, which is a state of [value, setter].
 */
const useLanguage = () => {

  const context = React.useContext(languageContext);

  if(!context) {
    throw new Error('Error: useLanguage must be used within a LanguageProvider');
  }

  return context;
}


/**
 * Provider function for the languageContext. Uses the useMemo hook to not
 * update unnecessarily.
 * @function LanguageProvider
 * @param {object} props - props to pass through from declared component.
 * @returns {JSX.Element} - Provider component.
 */
const LanguageProvider = (props) => {
  const defaultLanguage = 'en';
  const [language, setlanguage] = React.useState(defaultLanguage);

  const value = React.useMemo(() => [language, setlanguage], [language]);

  return <languageContext.Provider value={value} {...props} />;
}

export default { LanguageProvider, useLanguage };