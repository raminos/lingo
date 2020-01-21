import React from 'react';
import stringModule from '../helpers/strings';
// contexts
import performanceContext from '../contexts/performanceContext';
import languageContext from '../contexts/languageContext';
import guessedWordsContext from '../contexts/guessedWordsContext';

/**
 * Functional React component for a button which sets the performanceContext's giveUp property to true.
 * @function Congrats
 * @returns {JSX.Element} Rendered component
 */
const GiveUpButton = () => {
  const [ ,setPerformance] = performanceContext.usePerformance();
  const [language] = languageContext.useLanguage();
  const [guessedWords] = guessedWordsContext.useGuessedWords();

  /**
   * Boolean variable to use as a conditional on whether to add a 'disabled'
   * class to the button tag.
   * */
  let disabled = (guessedWords.length < 1) ? true : false;

  /**
   * Changes the performanceContext's state's 'giveUp' property to true.
   * @function handleClick
   * @returns {function} a call to the performanceContext's reducer function
   */
  const handleClick = () => {
    if (!disabled) return setPerformance({ type: 'give_up' });
  }

  return (
    <div data-test="component-give-up-button">
      <button
        type="button"
        data-test="give-up-button"
        className={`btn btn-danger ${disabled ? 'disabled' : ''}`}
        onClick={() => handleClick()}
      >
        {stringModule.getStringByLanguage(language, 'giveUpButton')}
      </button>
    </div>
  )
}

export default GiveUpButton;