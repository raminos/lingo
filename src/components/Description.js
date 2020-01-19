import React from 'react';
import stringModule from '../helpers/strings.js'

import languageContext from '../contexts/languageContext';

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