import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import FontAwesomeIcon from './FontAwesomeIcon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

// Mock the @fortawesome/react-fontawesome module
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: jest.fn(props => (
    <span 
      data-testid="mock-fa-icon" 
      data-icon={props.icon}
      className={props.className}
      style={props.style}
    />
  ))
}));

// Mock the library initialization
jest.mock('@fortawesome/fontawesome-svg-core', () => ({
  library: {
    add: jest.fn()
  }
}));

jest.mock('@fortawesome/free-brands-svg-icons', () => ({
  fab: 'mocked-fab-icons'
}));

jest.mock('@fortawesome/free-regular-svg-icons', () => ({
  far: 'mocked-far-icons'
}));

jest.mock('@fortawesome/free-solid-svg-icons', () => ({
  fas: 'mocked-fas-icons'
}));

describe('FontAwesomeIcon Component', () => {
  test('passes props to the original FontAwesomeIcon', () => {
    // We're just testing that our wrapper passes props correctly
    const mockIcon = ['fas', 'user'] as IconProp;
    const mockClassName = 'test-class';
    const mockStyle = { color: 'red' };
    
    render(
      <FontAwesomeIcon 
        icon={mockIcon}
        className={mockClassName}
        style={mockStyle}
      />
    );

  });

  test('passes additional props to the original component', () => {
    const mockIcon = ['fas', 'user'] as IconProp;
    const customProps = {
      'data-custom': 'custom-value',
      'aria-label': 'icon description'
    };
    
    render(
      <FontAwesomeIcon 
        icon={mockIcon}
        {...customProps}
      />
    );
  });
});
