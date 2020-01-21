import React from 'react';

/**
 * Functional React component to display a navbar element.
 * @function Nav
 * @param {Object} props - React props object.
 * @param {JSX.Element} children - Any content that should be rendered in the navbar.
 * @returns {JSX.Element} Rendered React component.
 */
const Nav = ({ children }) => {
  return (
    <div 
    className="container"
    data-test="component-nav">
      <div className="row justify-content-between">
        <h1>
          <a className="" href="/">Lingo</a>
        </h1>
        <div className="nav justify-content-end" id="navbarNav">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Nav;