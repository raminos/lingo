import React from 'react';
import stringModule from '../helpers/strings.js'

import languageContext from '../contexts/languageContext';

/**
 * Functional React component for a description of the game.
 * @function Description
 * @returns {JSX.Element} Rendered component
 */
const Description = () => {
  const [language] = languageContext.useLanguage();
  return (
    <p
      className="text-justify"
      data-test="component-description"
    >
      {stringModule.getStringByLanguage(language, 'description')}
    </p>
  )
};

export default Description;