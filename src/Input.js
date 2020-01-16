import React from 'react';
import Proptypes from 'prop-types';

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentState] = React.useState("");
  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="enter guess"
          value={currentGuess}
          onChange={(event) => setCurrentState(event.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: Proptypes.string.isRequired
}

export default Input;