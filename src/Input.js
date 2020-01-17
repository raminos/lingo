import React from 'react';
import Proptypes, { string } from 'prop-types';

import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import stringsModule from './helpers/strings';

const Input = ({ secretWord }) => {
  const language = React.useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();
  const [currentGuess, setCurrentGuess] = React.useState("");
  
  if (success) return null;
  
  return (
    <div data-test="component-input">
      <form className="form-inline" >
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            setCurrentGuess('')
            // TODO: update guessedWords
            // TODO: check against secretWord and update success if needed
          }}
        >
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: Proptypes.string.isRequired
}

export default Input;