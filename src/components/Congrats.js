import React from 'react';

import languageContext from '../contexts/languageContext';
import stringModule from '../helpers/strings';

/**
 * Functional react component for congratulatory message
 * @function
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
          {stringModule.getStringByLanguage(language, 'congrats')}
        </span>
      </div>
    )
};

export default Congrats;