/**
 * Tests for OutputButtons component and variable creation network communication
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import OutputButtons from './OutputButtons';
import { UI_CHANNEL } from '@ui/app.network';
import { prepareSwatchVariableData } from '@ui/helpers/variableDataPrep';
import { prepareSwatchStyleData } from '@ui/helpers/styleDataPrep';
import { prepareSwatchCreationData } from '@ui/helpers/swatchDataPrep';
import useSwatchStore from '@ui/store/useSwatchStore';
import useTokenNameStore from '@ui/store/useTokenNameStore';

// Mock the stores
jest.mock('@ui/store/useSwatchStore');
jest.mock('@ui/store/useTokenNameStore');

// Mock the network channel
jest.mock('@ui/app.network', () => ({
  UI_CHANNEL: {
    request: jest.fn()
  }
}));

// Mock the data preparation
jest.mock('@ui/helpers/variableDataPrep');
jest.mock('@ui/helpers/styleDataPrep');
jest.mock('@ui/helpers/swatchDataPrep');

const mockUseSwatchStore = useSwatchStore as jest.MockedFunction<typeof useSwatchStore>;
const mockUseTokenNameStore = useTokenNameStore as jest.MockedFunction<typeof useTokenNameStore>;
const mockPrepareSwatchVariableData = prepareSwatchVariableData as jest.MockedFunction<typeof prepareSwatchVariableData>;
const mockPrepareSwatchStyleData = prepareSwatchStyleData as jest.MockedFunction<typeof prepareSwatchStyleData>;
const mockPrepareSwatchCreationData = prepareSwatchCreationData as jest.MockedFunction<typeof prepareSwatchCreationData>;
const mockUIChannel = UI_CHANNEL as { request: jest.MockedFunction<any> };

describe('OutputButtons Variable Creation', () => {
  let mockSwatchStore: any;
  let mockTokenStore: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock swatch store
    mockSwatchStore = {
      shade: { color: '000000', name: 'Black' },
      tint: { color: 'FFFFFF', name: 'White' },
      primaryColors: [{ color: '3B82F6', name: 'Blue' }],
      shadeTintRampName: 'Gray'
    };

    // Mock token store
    mockTokenStore = {
      caseTreatment: 'lower',
      spaceTreatment: 'dash',
      leadingCharsCount: 2,
      separatorCharsCount: 1,
      leadingCharType: 'dash',
      separatorCharType: 'underscore',
      appendSeparatorToPrimitive: false
    };

    // Set up store hooks to return mock data
    mockUseSwatchStore.mockReturnValue(mockSwatchStore);
    mockUseTokenNameStore.mockReturnValue(mockTokenStore);

    // Mock data preparation
    mockPrepareSwatchVariableData.mockReturnValue({
      shade: { name: '--black', color: '000000' },
      tint: { name: '--white', color: 'FFFFFF' },
      primaryColors: [{ name: '--blue', color: '3B82F6' }],
      shadeTintRampName: '--gray',
      shadeTintSwatches: [{ color: '333333', step: 100 }],
      primarySwatches: [
        {
          name: '--blue',
          swatches: [{ color: '2563EB', step: 100 }]
        }
      ],
      tokenSettings: {
        separatorCharsCount: 1,
        separatorCharType: 'underscore'
      }
    });

    // Mock style data preparation (same structure)
    mockPrepareSwatchStyleData.mockReturnValue({
      shade: { name: '--black', color: '000000' },
      tint: { name: '--white', color: 'FFFFFF' },
      primaryColors: [{ name: '--blue', color: '3B82F6' }],
      shadeTintRampName: '--gray',
      shadeTintSwatches: [{ color: '333333', step: 100 }],
      primarySwatches: [
        {
          name: '--blue',
          swatches: [{ color: '2563EB', step: 100 }]
        }
      ],
      tokenSettings: {
        separatorCharsCount: 1,
        separatorCharType: 'underscore'
      }
    });

    // Mock swatch creation data preparation (with display settings)
    mockPrepareSwatchCreationData.mockReturnValue({
      shade: { name: '--black', color: '000000' },
      tint: { name: '--white', color: 'FFFFFF' },
      primaryColors: [{ name: '--blue', color: '3B82F6' }],
      shadeTintRampName: '--gray',
      shadeTintSwatches: [{ color: '333333', step: 100 }],
      primarySwatches: [
        {
          name: '--blue',
          swatches: [{ color: '2563EB', step: 100 }]
        }
      ],
      tokenSettings: {
        separatorCharsCount: 1,
        separatorCharType: 'underscore'
      },
      displayWidth: 1200,
      swatchSize: 64,
      fontSize: 12
    });
  });

  it('should render Add Variables button', () => {
    render(<OutputButtons />);
    
    const button = screen.getByRole('button', { name: 'Add Variables' });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('should show loading state when creating variables', async () => {
    // Mock a slow network request
    mockUIChannel.request.mockImplementation(() => new Promise(resolve => 
      setTimeout(() => resolve({ success: true, message: 'Success!' }), 100)
    ));

    render(<OutputButtons />);
    
    const button = screen.getByRole('button', { name: 'Add Variables' });
    fireEvent.click(button);

    // Should show loading state
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Creating...');

    // Wait for completion
    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(button).toHaveTextContent('Add Variables');
    });
  });

  it('should call data preparation with correct stores', async () => {
    mockUIChannel.request.mockResolvedValue({ success: true, message: 'Success!' });

    render(<OutputButtons />);
    
    const button = screen.getByRole('button', { name: 'Add Variables' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockPrepareSwatchVariableData).toHaveBeenCalledWith(mockSwatchStore, mockTokenStore);
    });
  });

  it('should send network request with prepared data', async () => {
    const mockResult = { success: true, message: 'Created 5 variables' };
    mockUIChannel.request.mockResolvedValue(mockResult);

    render(<OutputButtons />);
    
    const button = screen.getByRole('button', { name: 'Add Variables' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockUIChannel.request).toHaveBeenCalledWith(
        expect.any(Object), // PLUGIN object
        'createVariables',
        [expect.objectContaining({
          shade: { name: '--black', color: '000000' },
          tint: { name: '--white', color: 'FFFFFF' },
          tokenSettings: {
            separatorCharsCount: 1,
            separatorCharType: 'underscore'
          }
        })]
      );
    });
  });

  it('should show success toast on successful creation', async () => {
    const mockResult = { success: true, message: 'Created 5 variables successfully' };
    mockUIChannel.request.mockResolvedValue(mockResult);

    render(<OutputButtons />);
    
    const button = screen.getByRole('button', { name: 'Add Variables' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Created 5 variables successfully')).toBeInTheDocument();
    });
  });

  it('should show error toast on creation failure', async () => {
    const mockResult = { 
      success: false, 
      message: 'Failed to create variables', 
      error: 'Collection creation failed' 
    };
    mockUIChannel.request.mockResolvedValue(mockResult);

    render(<OutputButtons />);
    
    const button = screen.getByRole('button', { name: 'Add Variables' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Collection creation failed')).toBeInTheDocument();
    });
  });

  it('should handle network errors gracefully', async () => {
    mockUIChannel.request.mockRejectedValue(new Error('Network error'));

    render(<OutputButtons />);
    
    const button = screen.getByRole('button', { name: 'Add Variables' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Failed to create variables: Network error')).toBeInTheDocument();
    });
  });

  it('should handle non-Error exceptions', async () => {
    mockUIChannel.request.mockRejectedValue('String error');

    render(<OutputButtons />);
    
    const button = screen.getByRole('button', { name: 'Add Variables' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Failed to create variables: String error')).toBeInTheDocument();
    });
  });

  it('should handle toast visibility correctly', async () => {
    const mockResult = { success: true, message: 'Success!' };
    mockUIChannel.request.mockResolvedValue(mockResult);

    render(<OutputButtons />);
    
    const button = screen.getByRole('button', { name: 'Add Variables' });
    fireEvent.click(button);

    // Wait for toast to appear
    await waitFor(() => {
      expect(screen.getByText('Success!')).toBeInTheDocument();
    });

    // Toast should be visible
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  it('should show different toast durations for errors vs success', async () => {
    jest.useFakeTimers();

    // Test success toast (3000ms)
    const successResult = { success: true, message: 'Success!' };
    mockUIChannel.request.mockResolvedValue(successResult);

    const { rerender } = render(<OutputButtons />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Add Variables' }));

    await waitFor(() => {
      expect(screen.getByText('Success!')).toBeInTheDocument();
    });

    // Fast forward 3000ms
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.queryByText('Success!')).not.toBeInTheDocument();
    });

    // Test error toast (5000ms)
    jest.clearAllMocks();
    const errorResult = { success: false, message: 'Error!', error: 'Test error' };
    mockUIChannel.request.mockResolvedValue(errorResult);

    rerender(<OutputButtons />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Add Variables' }));

    await waitFor(() => {
      expect(screen.getByText('Test error')).toBeInTheDocument();
    });

    // Fast forward 3000ms (should still be visible)
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.getByText('Test error')).toBeInTheDocument();

    // Fast forward another 2000ms (total 5000ms, should disappear)
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.queryByText('Test error')).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it('should prevent multiple simultaneous requests', async () => {
    const mockResult = { success: true, message: 'Success!' };
    mockUIChannel.request.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockResult), 100))
    );

    render(<OutputButtons />);
    
    const button = screen.getByRole('button', { name: 'Add Variables' });
    
    // Click multiple times quickly
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    // Should only make one request
    expect(mockUIChannel.request).toHaveBeenCalledTimes(1);

    // Button should be disabled
    expect(button).toBeDisabled();

    // Wait for completion
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });

  describe('Style Creation', () => {
    it('should render Add Styles button', () => {
      render(<OutputButtons />);
      
      const button = screen.getByRole('button', { name: 'Add Styles' });
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });

    it('should show loading state when creating styles', async () => {
      // Mock a slow network request
      mockUIChannel.request.mockImplementation(() => new Promise(resolve => 
        setTimeout(() => resolve({ success: true, message: 'Success!' }), 100)
      ));

      render(<OutputButtons />);
      
      const button = screen.getByRole('button', { name: 'Add Styles' });
      fireEvent.click(button);

      // Should show loading state
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent('Creating...');

      // Wait for completion
      await waitFor(() => {
        expect(button).not.toBeDisabled();
        expect(button).toHaveTextContent('Add Styles');
      });
    });

    it('should call style data preparation with correct stores', async () => {
      mockUIChannel.request.mockResolvedValue({ success: true, message: 'Success!' });

      render(<OutputButtons />);
      
      const button = screen.getByRole('button', { name: 'Add Styles' });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockPrepareSwatchStyleData).toHaveBeenCalledWith(mockSwatchStore, mockTokenStore);
      });
    });

    it('should send network request with prepared style data', async () => {
      const mockResult = { success: true, message: 'Created 5 paint styles' };
      mockUIChannel.request.mockResolvedValue(mockResult);

      render(<OutputButtons />);
      
      const button = screen.getByRole('button', { name: 'Add Styles' });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockUIChannel.request).toHaveBeenCalledWith(
          expect.any(Object), // PLUGIN object
          'createStyles',
          [expect.objectContaining({
            shade: { name: '--black', color: '000000' },
            tint: { name: '--white', color: 'FFFFFF' },
            tokenSettings: {
              separatorCharsCount: 1,
              separatorCharType: 'underscore'
            }
          })]
        );
      });
    });

    it('should show success toast on successful style creation', async () => {
      const mockResult = { success: true, message: 'Created 5 paint styles successfully' };
      mockUIChannel.request.mockResolvedValue(mockResult);

      render(<OutputButtons />);
      
      const button = screen.getByRole('button', { name: 'Add Styles' });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('Created 5 paint styles successfully')).toBeInTheDocument();
      });
    });

    it('should show error toast on style creation failure', async () => {
      const mockResult = { 
        success: false, 
        message: 'Failed to create styles', 
        error: 'Style creation failed' 
      };
      mockUIChannel.request.mockResolvedValue(mockResult);

      render(<OutputButtons />);
      
      const button = screen.getByRole('button', { name: 'Add Styles' });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('Style creation failed')).toBeInTheDocument();
      });
    });

    it('should handle network errors gracefully during style creation', async () => {
      mockUIChannel.request.mockRejectedValue(new Error('Network error'));

      render(<OutputButtons />);
      
      const button = screen.getByRole('button', { name: 'Add Styles' });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('Failed to create styles: Network error')).toBeInTheDocument();
      });
    });

    it('should disable both buttons when creating styles', async () => {
      mockUIChannel.request.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({ success: true, message: 'Success!' }), 100))
      );

      render(<OutputButtons />);
      
      const variablesButton = screen.getByRole('button', { name: 'Add Variables' });
      const stylesButton = screen.getByRole('button', { name: 'Add Styles' });
      
      fireEvent.click(stylesButton);

      // Both buttons should be disabled during creation
      expect(variablesButton).toBeDisabled();
      expect(stylesButton).toBeDisabled();

      // Wait for completion
      await waitFor(() => {
        expect(variablesButton).not.toBeDisabled();
        expect(stylesButton).not.toBeDisabled();
      });
    });
  });

  describe('Swatch Creation', () => {
    it('should render Create Swatches button', () => {
      render(<OutputButtons />);
      
      const button = screen.getByRole('button', { name: 'Create Swatches' });
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });

    it('should show loading state when creating swatches', async () => {
      // Mock a slow network request
      mockUIChannel.request.mockImplementation(() => new Promise(resolve => 
        setTimeout(() => resolve({ success: true, message: 'Success!' }), 100)
      ));

      render(<OutputButtons />);
      
      const button = screen.getByRole('button', { name: 'Create Swatches' });
      fireEvent.click(button);

      // Should show loading state
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent('Creating...');

      // Wait for completion
      await waitFor(() => {
        expect(button).not.toBeDisabled();
        expect(button).toHaveTextContent('Create Swatches');
      });
    });

    it('should call swatch data preparation with correct stores and display settings', async () => {
      mockUIChannel.request.mockResolvedValue({ success: true, message: 'Success!' });

      render(<OutputButtons />);
      
      const button = screen.getByRole('button', { name: 'Create Swatches' });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockPrepareSwatchCreationData).toHaveBeenCalledWith(
          mockSwatchStore, 
          mockTokenStore,
          {
            displayWidth: 1200,
            swatchSize: 64,
            fontSize: 12
          }
        );
      });
    });

    it('should send network request with prepared swatch data', async () => {
      const mockResult = { success: true, message: 'Created 5 swatches on the pasteboard' };
      mockUIChannel.request.mockResolvedValue(mockResult);

      render(<OutputButtons />);
      
      const button = screen.getByRole('button', { name: 'Create Swatches' });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockUIChannel.request).toHaveBeenCalledWith(
          expect.any(Object), // PLUGIN object
          'createSwatches',
          [expect.objectContaining({
            shade: { name: '--black', color: '000000' },
            tint: { name: '--white', color: 'FFFFFF' },
            tokenSettings: {
              separatorCharsCount: 1,
              separatorCharType: 'underscore'
            },
            displayWidth: 1200,
            swatchSize: 64,
            fontSize: 12
          })]
        );
      });
    });

    it('should show success toast on successful swatch creation', async () => {
      const mockResult = { success: true, message: 'Created 5 swatches on the pasteboard' };
      mockUIChannel.request.mockResolvedValue(mockResult);

      render(<OutputButtons />);
      
      const button = screen.getByRole('button', { name: 'Create Swatches' });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('Created 5 swatches on the pasteboard')).toBeInTheDocument();
      });
    });

    it('should show error toast on swatch creation failure', async () => {
      const mockResult = { 
        success: false, 
        message: 'Failed to create swatches', 
        error: 'Font loading failed' 
      };
      mockUIChannel.request.mockResolvedValue(mockResult);

      render(<OutputButtons />);
      
      const button = screen.getByRole('button', { name: 'Create Swatches' });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('Font loading failed')).toBeInTheDocument();
      });
    });

    it('should handle network errors gracefully during swatch creation', async () => {
      mockUIChannel.request.mockRejectedValue(new Error('Network error'));

      render(<OutputButtons />);
      
      const button = screen.getByRole('button', { name: 'Create Swatches' });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('Failed to create swatches: Network error')).toBeInTheDocument();
      });
    });

    it('should disable all buttons when creating swatches', async () => {
      mockUIChannel.request.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({ success: true, message: 'Success!' }), 100))
      );

      render(<OutputButtons />);
      
      const variablesButton = screen.getByRole('button', { name: 'Add Variables' });
      const stylesButton = screen.getByRole('button', { name: 'Add Styles' });
      const swatchesButton = screen.getByRole('button', { name: 'Create Swatches' });
      
      fireEvent.click(swatchesButton);

      // All buttons should be disabled during creation
      expect(variablesButton).toBeDisabled();
      expect(stylesButton).toBeDisabled();
      expect(swatchesButton).toBeDisabled();

      // Wait for completion
      await waitFor(() => {
        expect(variablesButton).not.toBeDisabled();
        expect(stylesButton).not.toBeDisabled();
        expect(swatchesButton).not.toBeDisabled();
      });
    });
  });
});