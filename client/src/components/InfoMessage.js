import React from 'react';

/**
 * Functional React component to display messages
 * @param {Object} props - The component's props
 * @param {string} props.children - The message to be displayed.
 * @returns {JSC.Element} Rendered component.
 */
const InfoMessage = ({ children }) => {
  return (
    <p
        className="lead text-info text-center"
        data-test="component-info-message">
          {children}
    </p>
  )
}

export default InfoMessage;