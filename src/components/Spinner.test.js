import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { findByTestAttribute, checkProps } from '../../test/testUtilities';

import Spinner from './Spinner';

/**
 * Factory function to create a ShallowWrapper for the Spinner component.
 * @function setup
 * @returns {Enzyme.ShallowWrapper} A ShallowWrapper of the isolated component.
 */
const setup = () => {
  const wrapper = shallow(<Spinner>{[]}</Spinner>);
  const component = findByTestAttribute(wrapper, 'component-spinner');
  return component;
}

test('renders without errors', () => {
  const spinnerComponent = setup();
  expect(spinnerComponent.exists()).toBe(true);
});
test('does not throw error with expected props', () => {
  checkProps(Spinner, {children: []});
})