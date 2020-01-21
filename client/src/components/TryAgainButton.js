import React from 'react';
import stringModule from '../helpers/strings';

import languageContext from '../contexts/languageContext';
import performanceContext from '../contexts/performanceContext';

/**
 * Functional React component for a button which sets the performanceContext's 
 * giveUp and success properties to false.
 * @function TryAgainButton
 * @returns {JSX.Element} Rendered React component
 */
const TryAgainButton = () => {
  const [language] = languageContext.useLanguage();
  const setPerformance = performanceContext.usePerformance()[1];

  return (
    <div data-test="component-try-again-button">
      <button
        type="button"
        data-test="try-again-button"
        className='btn btn-info'
        onClick={() => setPerformance({ type: 'reset' })}
      >
        {stringModule.getStringByLanguage(language, 'tryAgainButton')}
      </button>
    </div>
  )
};

export default TryAgainButton;