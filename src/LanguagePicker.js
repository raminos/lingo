import React from 'react';
import languageContext from './contexts/languageContext';

const LanguagePicker = () => {
  const [language, setLanguage] = languageContext.useLanguage();
  const languages = [
    { code: 'en', symbol: '🇺🇸' },
    { code: 'fr', symbol: '🇫🇷' },
    { code: 'de', symbol: '🇩🇪' }
  ];

  const languageIcons = languages.map(lang => {
    let activeLanguageButton;
    if (lang.code === language) {
      activeLanguageButton = 'active';
    }
    return (
      <button
        type="button"
        className={`btn btn-light btn-md mx-1 ${activeLanguageButton}`}
        data-test="language-icon"
        key={lang.code}
        onClick={() => setLanguage(lang.code)}
      >
        <span className="h4">{lang.symbol}</span>
      </button>
    )
  });

  return (
    <div
      data-test="component-language-picker"
      className="">
      {languageIcons}
    </div>
  );
}

export default LanguagePicker;