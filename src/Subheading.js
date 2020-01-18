import React from 'react';
import stringModule from './helpers/strings.js'

import languageContext from './contexts/languageContext';

const Subheading = () => {
  const [language] = languageContext.useLanguage();
  return (
    <p
      className="text-justify"
      data-test="component-subheading"
    >
      {stringModule.getStringByLanguage(language, 'subheading')}
    </p>
  )
};

export default Subheading;