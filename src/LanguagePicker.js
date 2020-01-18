import React from 'react';
import languageContext from './contexts/languageContext';

const LanguagePicker = () => {
  const [language, setLanguage] = languageContext.useLanguage();
  const languages = [
    { code: 'en', symbol: '🇺🇸' },
    { code: 'fr', symbol: '🇫🇷'},
    { code: 'de', symbol: '🇩🇪'}
  ];

  const languageIcons = languages.map(lang =>
    <span
      data-test="language-icon"
      key={lang.code}
      onClick={() => setLanguage(lang.code)}
    >
      {lang.symbol}
    </span>
  );

  return (
    <div data-test="component-language-picker">
      {languageIcons}
    </div>
  );
}

export default LanguagePicker;