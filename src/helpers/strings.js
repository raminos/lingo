const languageStrings = {
  en: {
    subheading: 'Lingo is a television game show that aired in the Netherlands between 1989 and 2014, and returned in 2019 on the commercial channel SBS6. The format consists of a word game that combines Mastermind and Bingo. In this compact version of the game you are trying to guess a five letter word. After every attempt the game will tell you which letters of your word were in the correct and which in the wrong place.',
    congrats: 'Congratulations! You guessed the word!',
    submit: 'Submit',
    guessPrompt: 'Try to guess the secret word!',
    guessInputPlaceholder: 'enter guess',
    guessColumnHeader: 'Guessed Words',
    guessedWords: 'Guesses',
    matchingLettersColumnHeader: 'Matching Letters',
  },
  fr: {
    subheading: "Lingo est un jeu télévisé qui a été diffusé aux Pays-Bas de 1989 à 2014, et qui est revenu en 2019 sur la chaîne commerciale SBS6. Il s'agit d'un jeu de mots qui combine les jeux Mastermind et Bingo. Dans cette version du jeu, vous devez essayer de deviner un mot de cinq lettres. Après chaque tentative, le jeu vous indiquera les lettres qui sont à la même place dans le mot secret, et celles qui font également partie du mot secret mais qui ne sont pas à la bonne place.",
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