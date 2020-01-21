import React from 'react';

import languageContext from '../contexts/languageContext';
import stringModule from '../helpers/strings';

/**
 * Functional React component to display the secret word and a supportive message.
 * @function GiveUpMessage
 * @param {Object} props - React props
 * @param {string} props.children - The secret word
 * @returns {JSX.Element} Rendered component
 */
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