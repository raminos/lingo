// Based on the blog post 'Application State Management with React' by Kent C. Dodds
// https://kentcdodds.com/blog/application-state-management-with-react

import React from 'react';
const languageContext = React.createContext();

/**
 * @returns {array} - languageContext calue, which is a state of [value, setter].
 */
const useLanguage = () => {

  const context = React.useContext(languageContext);

  if(!context) {
    throw new Error('Error: useLanguage must be used within a LanguageProvider');
  }

  return context;
}


/**
 * @param {object} props - props to pass through from declared component.
 * @returns {JSC.Element} - Provider component
 */
const LanguageProvider = (props) => {
  const defaultLanguage = 'en';
  const [language, setlanguage] = React.useState(defaultLanguage);

  const value = React.useMemo(() => [language, setlanguage], [language]);

  return <languageContext.Provider value={value} {...props} />;
}

export default { LanguageProvider, useLanguage };