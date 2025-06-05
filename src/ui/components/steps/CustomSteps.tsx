import React, {useState} from 'react';
import FontAwesomeIcon from '../helpers/FontAwesomeIcon';
import useSwatchStore from '../../store/useSwatchStore';
import Toast from '../helpers/Toast';
import {
    TOAST_DURATION,
    INVALID_CUSTOM_STEP_NON_NUMERIC,
    INVALID_CUSTOM_STEP_OUT_OF_RANGE,
    INVALID_CUSTOM_STEP_RESERVED, INVALID_CUSTOM_STEP_DUPLICATED
} from '../../../constants/uiConstants';
import {ClassAndStyle} from "../../interfaces/ClassAndStyle";

export const CustomSteps: React.FC = ({className = "", style = {}}: ClassAndStyle) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const addCustomStep = useSwatchStore((state) => state.addCustomStep);
    const customSteps = useSwatchStore((state) => state.customSteps);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const isValidInput = (): boolean => {
        // Check if input is empty
        if (!inputValue.trim()) return false;

        // Check if input is numeric
        const numericRegex = /^[0-9]+$/;
        if (!numericRegex.test(inputValue)) return false;

        const step = parseInt(inputValue, 10);

        // Check if input is within range
        if (step < 1 || step > 999) return false;

        // Check if input is a reserved value
        if (step === 0 || step === 500 || step === 1000) return false;

        // Check if input is already in the store
        return !customSteps.has(step);


    };

    const getErrorMessage = (): string => {
        // Check if input is numeric
        const numericRegex = /^[0-9|-]+$/;
        if (!numericRegex.test(inputValue)) return INVALID_CUSTOM_STEP_NON_NUMERIC;

        const step = parseInt(inputValue, 10);

        // Check if input is a reserved value
        if (step === 0 || step === 500 || step === 1000) return INVALID_CUSTOM_STEP_RESERVED;

        // Check if input is within range
        if (step < 1 || step > 999) return INVALID_CUSTOM_STEP_OUT_OF_RANGE;

        // Check if input is already in the store
        if (customSteps.has(step)) return INVALID_CUSTOM_STEP_DUPLICATED;


        return '';
    };

    const showToastMessage = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
    };

    const hideToast = () => {
        setShowToast(false);
    };

    const handleAddStep = () => {
        if (isValidInput()) {
            const step = parseInt(inputValue, 10);
            addCustomStep(step);
            buildSwatches();
            setInputValue('');
        } else {
            showToastMessage(getErrorMessage());
        }
    };

    return (
        <div className={`custom-steps ${className}`} style={style}>
            <span>Add custom step: </span>
            <span>
                <input
                    type="text"
                    maxLength={4}
                    className="figma-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    style={{width: '8ch'}}
                />
                <span
                    onClick={handleAddStep}
                    style={{marginLeft: '8px', cursor: 'pointer'}}
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
            />
        </div>
    );
};

export default CustomSteps;
