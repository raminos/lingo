import cors from 'cors';
import express from 'express';
import fs from 'fs';

const app = express();

app.use(cors());

/**@typedef wordsObject
 * @type {Object}
 * @property {Array} languageCode - An array of random five letter long words in the given language.
 */
/**
 * Asynchronous function to retrieve the data from the words.json file.
 * @async
 * @function retrieveWords
 * @returns {Promise.<wordsObject>} Resolves to the content of the parsed JSON file.
 */
const retrieveWords = async () => {
  try {
    return JSON.parse(await fs.promises.readFile('./data/words.json', 'utf-8'));
  } catch (error) {
    throw new Error('An Error occured while reading the words.json file.', error)
  }
}

/**
 * Selects randomly a word from a given language context from 
 * @function returnWord
 * @param {wordsObject} unselectedWords - Object containing all servable words categorized by languages. 
 * @param {string} languageCode - The language code specified by the request. 
 */
const returnWord = (unselectedWords, languageCode) => {
  const selectedWords = unselectedWords[languageCode];
  const word = selectedWords[Math.floor(Math.random() * selectedWords.length)]
  return word;
}

/**
 * Handles all requests made by the React client.
 * Serves a random word from the wordsObject based on the languageCode specified in the url. 
 * Throws an Error, if the languageCode is not known. 
 */

app.get('/:id', (req, res) => {
  let languageCode = req.params.id;

  retrieveWords()
    .then((unselectedWords) => {
      if (unselectedWords[languageCode]) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.send(returnWord(unselectedWords, languageCode));
      } else {
        res.statusCode = 404;
        res.send('Error 404: Resource Not Found');
      }
    });
});


app.listen(4000, () =>
  console.log(`Server listening on port ${4000}`),
);

export default app;