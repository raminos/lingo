import axios from 'axios';

import { getLetterMatchCount } from '../helpers';

export const getSecretWord = async (setSecretWord) => {
  const response = await axios.get('http://localhost:3030');
  setSecretWord(response.data);
};

//
export default {
  getSecretWord,
}