import React from 'react';
import PropTypes from 'prop-types';

/**
 * Functional React component to display a spinner element.
 * @function Spinner
 * @param {Object} props - React props object.
 * @param {JSX.Element[]} children - The neededLanguage strings. Due to the 
 * ReactHtmlParser module the component receives Arrays of JSX elements.
 * @returns {JSX.Element} Rendered React component.
 */
const Spinner = ({children}) => {
  return (
    <div
      data-test="component-spinner"
      className="d-flex justify-content-center">
      <div>
        <div
          className="spinner-grow text-muted"
          role="status"
        >
          <span className="sr-only">
            Loading...
            </span>
        </div>
        <p className="text-muted">
          {children}
        </p>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  // The component is recieving Arrays of JSX elements because of ReactHtmlParser
  children: PropTypes.array.isRequired
}

export default Spinner;