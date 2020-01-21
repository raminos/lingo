
/**
 * @function getMatchingLetters - 
 * @param {string} guessedWord - Guessed word.
 * @param {string} secretWord - Secret word.
 * @returns {object} - Number of letter that match between the guessed and
 * the secret word.
 */
export function getMatchingLetters(guessedWord, secretWord) {
  const matchingPositions = {};
  const notMatchingPositions = {};

  const secretWordObject = {};
  [...secretWord].forEach((letter, index) => {
    secretWordObject[index] = letter;
  });

  const guessedWordObject = {};
  [...guessedWord].forEach((letter, index) => {
    guessedWordObject[index] = letter;
  })

  const secretWordObjectEntries = Object.entries(secretWordObject);
  secretWordObjectEntries.forEach(entry => {
    const key = entry[0];
    const value = entry[1];

    if (value === guessedWordObject[key]) {
      matchingPositions[key] = value;
      delete secretWordObject[key];
      delete guessedWordObject[key];
    }
  });

  Object.entries(guessedWordObject).forEach(entry => {
    const key = entry[0];
    const value = entry[1];

    Object.entries(secretWordObject).forEach(secretEntry => {
      const secretKey = secretEntry[0];
      const secretValue = secretEntry[1];

      if (value === secretValue) {
        notMatchingPositions[key] = value;
        delete secretWordObject[secretKey];
        delete guessedWordObject[key];

      }
    })
  })

  const matchingLetters = {
    matchingPositions,
    notMatchingPositions,
  }

  return matchingLetters;
}

/**
 * {
 *  matchingLetters: {
 *    matchingPositions: {},
 *    notMatchingPositions: {},
 *  },
 * }
 */