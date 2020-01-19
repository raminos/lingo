import { getMatchingLetters } from './';

describe('getMatchingLetter', () => {
  const secretWord = 'party';
  test('returns correct object when there are no matching letters', () => {
    const letterMatchCount = getMatchingLetters('bones', secretWord);
    expect(letterMatchCount).toMatchObject({
      matchingPositions: {},
      notMatchingPositions: {}
    });
  });
  test('returns correct count when there are three matching letters in matching positions', () => {
    const letterMatchCount = getMatchingLetters('farty', secretWord);
    expect(letterMatchCount).toMatchObject({
      matchingPositions: { '1': 'a', '2': 'r', '3': 't' },
      notMatchingPositions: {}
    });
  });
  test('returns correct count when there are two matching letters in positions that do not match', () => {
    const letterMatchCount = getMatchingLetters('amber', secretWord);
    expect(letterMatchCount).toMatchObject({
      matchingPositions: {},
      notMatchingPositions: { '0': 'a', '4': 'r' }
    });
  });
  test('returns correct count when there are three matching letters in matching positions and a letter in a position that does not match', () => {
    const letterMatchCount = getMatchingLetters('patsy', secretWord);
    expect(letterMatchCount).toMatchObject({
      matchingPositions: {'0': 'p', '1': 'a', '4': 'y'},
      notMatchingPositions: { '2': 't' }
    });
  });
  test('returns correct count when there are duplicate letters in the guess', () => {
    const letterMatchCount = getMatchingLetters('parka', secretWord);
    expect(letterMatchCount).toMatchObject({
      matchingPositions: { '0': 'p', '1': 'a', '2': 'r' },
      notMatchingPositions: {}
    });
  });
});

test('returns correct object', () => {
  const secretWord = 'zartyxy';
  const guessedWord = 'hardytz';
  const expectedReturnObject = {
    "matchingPositions": { "1": "a", "2": "r", "4": "y" }, "notMatchingPositions": { "5": "t", "6": "z" },
  };
  expect(getMatchingLetters(guessedWord, secretWord)).toMatchObject(expectedReturnObject);
});