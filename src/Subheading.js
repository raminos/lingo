import React from 'react';
import stringModule from './helpers/strings.js'
import ReactHtmlParser from 'react-html-parser';

import languageContext from './contexts/languageContext';

const Subheading = () => {
  const [language] = languageContext.useLanguage();
  return (
    <p
      className="text-justify"
      data-test="component-subheading"
    >
      {ReactHtmlParser(stringModule.getStringByLanguage(language, 'subheading'))}
    </p>
  )
};

export default Subheading;