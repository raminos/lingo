import React from 'react';
import stringModule from '../helpers/strings';
// contexts
import languageContext from '../contexts/languageContext';
import performanceContext from '../contexts/performanceContext';



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