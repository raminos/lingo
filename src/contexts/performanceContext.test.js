import React from 'react';
import { shallow, mount } from 'enzyme';

import performanceContext from './performanceContext';

// a functional component that calls usePerformance for the tests
const FunctionalComponent = () => {
  performanceContext.usePerformance();
  return <div />;
}

test('usePerformance throws error when not wrapped in PerformanceProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow('usePerformance must be used within a PerformanceProvider')
});
test('usePerformance does not throw error when wrapped in PerformanceProvider', () => {
  expect(() => {
    mount(
      <performanceContext.PerformanceProvider>
        <FunctionalComponent />
      </performanceContext.PerformanceProvider>
    );
  }).not.toThrow();
})