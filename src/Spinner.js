import React from 'react';

import languageContext from './contexts/languageContext';
import stringModule from './helpers/strings';

const Spinner = () => {
  const [language] = languageContext.useLanguage();
  return (
    <div
      className="container"
      data-test="component-spinner"
    >
      <div className="d-flex justify-content-center">
        <div className="row">
          <div className="">
            <div
              className="spinner-border mx-5 text-muted"
              role="status"
            >
              <span className="sr-only">
                Loading...
            </span>
            </div>
            <div className="row">
              <p className="text-muted">
                {stringModule.getStringByLanguage(language, 'loading')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;