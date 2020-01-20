import React from 'react';
import stringModule from '../helpers/strings';
// contexts
import performanceContext from '../contexts/performanceContext';
import languageContext from '../contexts/languageContext';
import guessedWordsContext from '../contexts/guessedWordsContext';


const GiveUpButton = () => {
  const [performance, setPerformance] = performanceContext.usePerformance();
  const [language] = languageContext.useLanguage();
  const [guessedWords] = guessedWordsContext.useGuessedWords();

  // diables Button, when no guess was made
  let disabled = (guessedWords.length < 1) ? true : false;

  const handleClick = () => {
    if (!disabled) return setPerformance({ type: 'give_up' });
  }

  if (!performance.success && !performance.giveUp) {
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
  else {
    return null;
  }
};

export default GiveUpButton;