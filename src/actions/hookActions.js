import axios from 'axios';

export const getSecretWord = async (setSecretWord, languageCode) => {
  languageCode = languageCode || 'en';
  const response = await axios.get(`http://localhost:3030/${languageCode}`);
  return setSecretWord(response.data);
};

//
export default {
  getSecretWord
}