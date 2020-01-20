import React from 'react';
// contexts
import languageContext from '../contexts/languageContext';
// helpers
import stringModule from '../helpers/strings';

const Explanation = () => {
  const [language] = languageContext.useLanguage();
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    setVisible({ type: 'language_change' });
  }, [language]);

  if (visible) {
    return (
      <div
        data-test="component-explanation"
        className="alert alert-warning alert-dismissible"
        role="alert"
      >
        <h4>{stringModule.getStringByLanguage(language, 'tableExplanationHeading')}</h4>
        <hr />
        <p data-test="explanation-message">
          {stringModule.getStringByLanguage(language, 'tableExplanation')}
        </p>
        <button
          type="button"
          data-test="close-button"
          className="close"
          onClick={() => setVisible(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }
  else return null;
};

export default Explanation