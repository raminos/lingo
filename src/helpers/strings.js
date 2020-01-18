const languageStrings = {
  en: {
    congrats: 'Congratulations! You guessed the word!',
    submit: 'Submit',
    guessPrompt: 'Try to guess the secret word!',
    guessInputPlaceholder: 'enter guess',
    guessColumnHeader: 'Guessed Words',
    guessedWords: 'Guesses',
    matchingLettersColumnHeader: 'Matching Letters',
  },
  fr: {
    congrats: 'Bravo! Vous avez deviné le mot!',
    submit: 'Soumettre',
    guessPrompt: 'Essayez de deviner le mot secret!',
    guessInputPlaceholder: 'écrire une suggestion',
    guessColumnHeader: 'Mots suggérés',
    guessedWords: 'Suggestions',
    matchingLettersColumnHeader: 'lettres identiques',
  },
  de: {
    congrats: 'Herzlichen Glückwunsch! Sie haben das Wort erraten!',
    submit: 'Bestätigen',
    guessPrompt: 'Versuchen Sie das geheime Wort zu erraten!',
    guessInputPlaceholder: 'ihre Vermutung',
    guessColumnHeader: 'Geratene Worte',
    guessedWords: 'Worte',
    matchingLettersColumnHeader: 'passende Buchstaben',
  },
};

const getStringByLanguage = (languageCode, stringKey, strings = languageStrings) => {
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    console.warn(`Could not get string '${stringKey}' for '${languageCode}'`);

    // fall back to english
    return strings.en[stringKey];
  }
  return strings[languageCode][stringKey];
};

export default {
  getStringByLanguage,
}