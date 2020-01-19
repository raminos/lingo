import React from 'react';

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