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
      <h4 className="alert-heading">
        {`${stringModule.getStringByLanguage(language, 'secretWordSpoiler')} ${children}`}
      </h4>
      <hr />
      <p data-test="give-up-message">
        {stringModule.getStringByLanguage(language, 'giveUpMessage')}
      </p>
    </div>
  )
};

export default GiveUpMessage;