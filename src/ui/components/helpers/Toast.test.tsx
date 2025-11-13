import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toast from './Toast';

// Mock timer functions
jest.useFakeTimers();

describe('Toast Component', () => {
  test('renders with message when isVisible is true', () => {
    const handleClose = jest.fn();
    render(
      <Toast 
        message="Test Toast Message" 
        isVisible={true} 
        onClose={handleClose} 
      />
    );
    
    expect(screen.getByText('Test Toast Message')).toBeInTheDocument();
  });

  test('does not render when isVisible is false', () => {
    const handleClose = jest.fn();
    render(
      <Toast 
        message="Test Toast Message" 
        isVisible={false} 
        onClose={handleClose} 
      />
    );
    
    expect(screen.queryByText('Test Toast Message')).not.toBeInTheDocument();
  });

  test('applies default class when no type is provided', () => {
    const handleClose = jest.fn();
    render(
      <Toast 
        message="Default Toast" 
        isVisible={true} 
        onClose={handleClose} 
      />
    );
    
    const toast = screen.getByTestId('toast');
    expect(toast).toHaveClass('show');
    expect(toast).not.toHaveClass('figma-toast-error');
    expect(toast).not.toHaveClass('figma-toast-success');
    expect(toast).not.toHaveClass('figma-toast-warning');
  });

  test('applies error class when type is error', () => {
    const handleClose = jest.fn();
    render(
      <Toast 
        message="Error Toast" 
        type="error"
        isVisible={true} 
        onClose={handleClose} 
      />
    );
    
    const toast = screen.getByTestId('toast');
    expect(toast).toHaveClass('figma-toast-error');
  });

  test('applies success class when type is success', () => {
    const handleClose = jest.fn();
    render(
      <Toast 
        message="Success Toast" 
        type="success"
        isVisible={true} 
        onClose={handleClose} 
      />
    );
    
    const toast = screen.getByTestId('toast');
    expect(toast).toHaveClass('figma-toast-success');
  });

  test('applies warning class when type is warning', () => {
    const handleClose = jest.fn();
    render(
      <Toast 
        message="Warning Toast" 
        type="warning"
        isVisible={true} 
        onClose={handleClose} 
      />
    );
    
    const toast = screen.getByTestId('toast');
    expect(toast).toHaveClass('figma-toast-warning');
  });

  test('calls onClose after duration', () => {
    const handleClose = jest.fn();
    render(
      <Toast 
        message="Auto Close Toast" 
        duration={3000}
        isVisible={true} 
        onClose={handleClose} 
      />
    );
    
    // Verify that onClose hasn't been called yet
    expect(handleClose).not.toHaveBeenCalled();
    
    // Fast-forward time by 3000ms
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    // Verify that onClose has been called
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('clears timeout when component unmounts', () => {
    const handleClose = jest.fn();
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    
    const { unmount } = render(
      <Toast 
        message="Unmount Toast" 
        duration={3000}
        isVisible={true} 
        onClose={handleClose} 
      />
    );
    
    // Unmount the component
    unmount();
    
    // Verify that clearTimeout was called
    expect(clearTimeoutSpy).toHaveBeenCalled();
    
    // Fast-forward time by 3000ms
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    // Verify that onClose wasn't called after unmounting
    expect(handleClose).not.toHaveBeenCalled();
    
    clearTimeoutSpy.mockRestore();
  });

  test('uses custom duration when provided', () => {
    const handleClose = jest.fn();
    render(
      <Toast 
        message="Custom Duration Toast" 
        duration={1500} // Custom duration
        isVisible={true} 
        onClose={handleClose} 
      />
    );
    
    // Fast-forward time by 1000ms (not enough to trigger onClose)
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Verify that onClose hasn't been called yet
    expect(handleClose).not.toHaveBeenCalled();
    
    // Fast-forward time by another 500ms (total 1500ms, should trigger onClose)
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // Verify that onClose has been called
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
