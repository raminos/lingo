// Based on the blog post 'Application State Management with React' by Kent C. Dodds
// https://kentcdodds.com/blog/application-state-management-with-react

import React from 'react';

const successContext = React.createContext();

/**
 * @returns {array} - successContext calue, which is a state of [value, setter].
 */
const useSuccess = () => {

  const context = React.useContext(successContext);

  if(!context) {
    throw new Error('useSuccess must be used within a SuccessProvider');
  }

  return context;
}


/**
 * @param {object} props - props to pass through from declared component.
 * @returns {JSC.Element} - Provider component
 */
const SuccessProvider = (props) => {
  const [success, setSuccess] = React.useState(false);

  const value = React.useMemo(() => [success, setSuccess], [success]);

  return <successContext.Provider value={value} {...props} />;
}

export default { SuccessProvider, useSuccess };