import axios from 'axios';

const getSecretWord = async (setSecretWord, languageCode) => {
  languageCode = languageCode || 'en';
  const response = await axios.get(`http://localhost:4000/${languageCode}`);
  return setSecretWord(response.data);
};


export default {
  getSecretWord
}