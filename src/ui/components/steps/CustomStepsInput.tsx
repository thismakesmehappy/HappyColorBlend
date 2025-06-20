import React, {useState} from 'react';
import FontAwesomeIcon from '../helpers/FontAwesomeIcon';
import useSwatchStore from '../../store/useSwatchStore';
import Toast from '../helpers/Toast';
import {TOAST_DURATION} from '../../../constants/uiConstants';
import {ClassAndStyle} from "../../interfaces/ClassAndStyle";
import {SwatchGenerationService} from '../../services';

export const CustomStepsInput: React.FC = ({className = "", style = {}}: ClassAndStyle) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const addCustomStep = useSwatchStore((state) => state.addCustomStep);
    const customSteps = useSwatchStore((state) => state.customSteps);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const validateInput = (): { isValid: boolean; errorMessage?: string } => {
        if (!inputValue.trim()) {
            return {isValid: false, errorMessage: 'Input cannot be empty'};
        }

        // Check if input is numeric
        const numericRegex = /^[0-9]+$/;
        if (!numericRegex.test(inputValue)) {
            return {isValid: false, errorMessage: 'Custom step must be a number'};
        }

        const step = parseInt(inputValue, 10);
        return SwatchGenerationService.validateCustomStep(
            step,
            customSteps,
            [0, 500, 1000]
        );
    };

    const showToastMessage = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
    };

    const hideToast = () => {
        setShowToast(false);
    };

    const handleAddStep = () => {
        const validation = validateInput();

        if (validation.isValid) {
            const step = parseInt(inputValue, 10);
            addCustomStep(step);
            buildSwatches();
            setInputValue('');
        } else {
            showToastMessage(validation.errorMessage || 'Invalid input');
        }
    };

    const isValidInput = (): boolean => {
        return validateInput().isValid;
    };

    return (
        <div className={`custom-steps ${className}`} style={style} data-testid="custom-steps">
            <span>Add custom step: </span>
            <span>
                <input
                    type="text"
                    maxLength={4}
                    className="figma-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    style={{width: '8ch'}}
                    data-testid="custom-step-input"
                />
                <span
                    onClick={handleAddStep}
                    style={{marginLeft: '8px', cursor: 'pointer'}}
                    data-testid="add-custom-step-button"
                >
                    <FontAwesomeIcon
                        icon="circle-plus"
                        className={`figma-icon ${isValidInput() ? 'figma-text-primary' : 'figma-text-secondary'}`}
                    />
                </span>
            </span>
            <Toast
                message={toastMessage}
                type="error"
                duration={TOAST_DURATION}
                isVisible={showToast}
                onClose={hideToast}
                data-testid="custom-step-toast"
            />
        </div>
    );
};

export default CustomStepsInput;