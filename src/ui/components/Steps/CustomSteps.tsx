import React, {useState} from 'react';
import useSwatchStore from '../../store/useSwatchStore';
import Toast from '../helpers/Toast';
import {
    TOAST_DURATION,
    INVALID_CUSTOM_STEP_NON_NUMERIC,
    INVALID_CUSTOM_STEP_OUT_OF_RANGE,
    INVALID_CUSTOM_STEP_RESERVED, INVALID_CUSTOM_STEP_DUPLICATED
} from '../../../constants/uiConstants';
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import Button from "@ui/components/helpers/Button";
import {FormControl} from "react-bootstrap";

interface CustomStepsProps extends ClassAndStyle {
}

export const CustomSteps = ({className = "", style = {}, id}: CustomStepsProps) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const addCustomStep = useSwatchStore((state) => state.addCustomStep);
    const customSteps = useSwatchStore((state) => state.customSteps);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    const buildColorScale = useSwatchStore((state) => state.buildColorScale);

    const numericRegex = /^[0-9]*$/; // * makes an empty string possible;
                                     // we are already evaluating empty string in isValidInput, so we can share it

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 3 && numericRegex.test(e.target.value) && parseInt(e.target.value) != 0) {
            setInputValue(e.target.value);
        }
    };

    const isValidInput = (): boolean => {
        // Check if input is empty
        if (!inputValue.trim()) return false;

        // Check if input is numeric
        if (!numericRegex.test(inputValue)) return false;

        const step = parseInt(inputValue, 10);

        // Check if input is within range
        if (step < 1 || step > 999) return false;

        // Check if input is already in the store
        return !customSteps.has(step);


    };

    // TODO: Can we refactor this to use the previous function rather than redefine what's valid?
    const getErrorMessage = (): string => {
        // Check if input is numeric
        const numericRegex = /^[0-9|-]+$/;
        if (!numericRegex.test(inputValue)) return INVALID_CUSTOM_STEP_NON_NUMERIC;

        const step = parseInt(inputValue, 10);

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
            buildColorScale();
            setInputValue('');
        } else {
            showToastMessage(getErrorMessage());
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddStep();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            setInputValue('');
        }
    };


    return (
        <div className={`custom-steps ${className}`} style={style} data-testid="custom-steps" id={id}>
            <div className="d-flex align-items-center">
                <FormControl
                    type="text"
                    maxLength={4}
                    // className="figma-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    style={{width: '6ch'}}
                    data-testid="custom-step-input"
                    // className={"form-control d-inline"}
                    size={'sm'}
                    className={!isValidInput() ? 'invalid' : ''}
                />
                <Button
                    className={'ms-3'}
                    onClick={handleAddStep}
                    disabled={!isValidInput()}
                    type={'primary'}
                >
                    Add
                </Button>
            </div>
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

export default CustomSteps;