import React from 'react';
import stringModule from '../helpers/strings.js'
import ReactHtmlParser from 'react-html-parser';

import languageContext from '../contexts/languageContext';

const Description = () => {
  const [language] = languageContext.useLanguage();
  return (
    <p
      className="text-justify"
      data-test="component-description"
    >
      {ReactHtmlParser(stringModule.getStringByLanguage(language, 'description'))}
    </p>
  )
};

export default Description;