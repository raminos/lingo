import React from 'react';
import languageContext from '../contexts/languageContext';

/**
 * Functional React component to display a set of language buttons.
 * @function LanguagePicker
 * @returns {JSX.Element} Rendered React component.
 */
const LanguagePicker = () => {
  const [language, setLanguage] = languageContext.useLanguage();
  const languages = [
    { code: 'en', symbol: '🇺🇸' },
    { code: 'fr', symbol: '🇫🇷' },
    { code: 'de', symbol: '🇩🇪' }
  ];

  /**
   * Handles language icon click.
   * @function handleClick
   * @param {React.SyntheticEvent} event - A SyntheticEvent of a button
   * @returns {string} Button's id, which is the language code.
   */
  const handleClick = (event) => {
    return setLanguage(event.currentTarget.id);
  }

  /**
   * An Array of buttons displaying the languages' flags.
   * @constant languageIcons
   * @type {JSX.Element[]}
   */
  const languageIcons = languages.map(lang => {
    let activeLanguageButton = '';
    if (lang.code === language) activeLanguageButton = 'active';
    return (
      <button
        type="button"
        className={`btn btn-light btn-md mx-1 ${activeLanguageButton}`}
        data-test="language-icon"
        key={lang.code}
        id={lang.code}
        onClick={(event) => handleClick(event)
        }
      >
        <span className="h4">{lang.symbol}</span>
      </button >
    )
  });

  return (
    <div data-test="component-language-picker">
      {languageIcons}
    </div>
  );
}

export default LanguagePicker;