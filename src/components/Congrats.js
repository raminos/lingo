import React from 'react';

import languageContext from '../contexts/languageContext';
import stringsModule from '../helpers/strings';

/**
 * Functional react component for congratulatory message
 * @function
 * @param {object} props - React props 
 * @returns {JSX.Element} - Rendered component (or null is 'success' prop is false)
 */
const Congrats = () => {
  const [language] = languageContext.useLanguage();

    return (
      <div
        data-test="component-congrats"
        className="alert alert-success"
      >
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, 'congrats')}
        </span>
      </div>
    )
};

export default Congrats;