import React from 'react';
// contexts
import languageContext from '../contexts/languageContext';
// helpers
import stringModule from '../helpers/strings';

/**
 * Functional React component for the explanation of the tiles' coloring.
 * @function Congrats
 * @returns {JSX.Element} Rendered component
 */
const Explanation = () => {
  const [language] = languageContext.useLanguage();
  /**
   * internal component state to manage the close button functionality.
   * */
  const [visible, setVisible] = React.useState(true);

  /**
   * gets triggered by the languageContext. Sets visible to true so 
   * that the user can see the explanation again upon language change.
   */
  React.useEffect(() => {
    setVisible(true);
  }, [language]);

  if (visible) {
    return (
      <div
        data-test="component-explanation"
        className="alert alert-warning alert-dismissible"
      >
        <h4>
          {stringModule.getStringByLanguage(language, 'tableExplanationHeading')}
        </h4>
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

export default Explanation;