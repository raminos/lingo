import React from 'react';

import languageContext from '../contexts/languageContext';
import stringModule from '../helpers/strings';

/**
 * Functional React component for a congratulatory message
 * @function Congrats
 * @returns {JSX.Element} Rendered component
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