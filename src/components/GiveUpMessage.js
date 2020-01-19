import React from 'react';

import languageContext from '../contexts/languageContext';
import stringModule from '../helpers/strings';


const GiveUpMessage = ({ children }) => {
  const [language] = languageContext.useLanguage();

  return (
    <div
      className="alert alert-danger"
      data-test="component-give-up-message"
      role="alert"
    >
      <h4 class="alert-heading">{children}</h4>
      <hr />
      <p>{stringModule.getStringByLanguage(language, 'giveUpMessage')}</p>
    </div>
  )
};

export default GiveUpMessage;