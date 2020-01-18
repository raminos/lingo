import React from 'react';

const Spinner = () => (
  <div
    className="container"
    data-test="spinner"
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
            <p className="text-muted">Loading secret word...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Spinner;