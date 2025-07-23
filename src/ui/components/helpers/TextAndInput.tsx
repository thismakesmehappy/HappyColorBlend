import React, {useState, useRef, useEffect} from 'react';
import FontAwesomeIcon from "../helpers/FontAwesomeIcon";
import Toast from "../helpers/Toast";
import {TOAST_DURATION} from "../../../constants/uiConstants";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";

interface TextAndInputProps extends ClassAndStyle {
    inputText: string,
    setInputText: (value: string) => void,
}


const TextAndInput = ({className = '', style = {}, inputText, setInputText}: TextAndInputProps) => {

    // State for neutral ramp name editing
    const [isEditing, setIsEditing] = useState(false);
    const [tempText, setTempText] = useState(inputText);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    // Function to show toast
    const showToastMessage = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
    };

    // Function to hide toast
    const hideToast = () => {
        setShowToast(false);
    };

    // Function to update neutral ramp name
    const updateText = () => {
        if (isValidText(tempText)) {
            setInputText(tempText);
            setIsEditing(false);
            return;
        }
        showToastMessage("Neutral ramp name cannot be empty");
        return;
    };

    // Function to cancel editing
    const cancelEdit = () => {
        setTempText(inputText);
        setIsEditing(false);
    };

    const isValidText = (text: string) => {
        return (text.trim() !== '');
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            updateText();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            cancelEdit();
        }
    };

    return (
        <div className={className}
             style={style}>

            {isEditing ? (
                <div>
                    <input value={tempText}
                           onChange={(e) => setTempText(e.currentTarget.value)}
                           onKeyDown={handleKeyDown}
                           ref={inputRef}
                           data-testid="swatch-name-input"
                           className="w-75 figma-mr-xs"
                    />

                    <>
                    <span onClick={() => cancelEdit()} data-testid="cancel-button" className="figma-mr-xs">
                        <FontAwesomeIcon icon={"circle-xmark"} className={"figma-icon figma-text-primary"} />
                    </span>
                        <span onClick={() => updateText()} data-testid="save-button">
                        <FontAwesomeIcon
                            icon={"circle-check"}
                            className={`figma-icon ${isValidText(tempText) ? "figma-text-primary" : "figma-text-disabled"}`}
                        />
                    </span>

                    </>
                </div>
            ) : (
                <span>
                    <p className="fw-bold d-inline-block mb-0">{inputText}</p>
                    <span onClick={() => setIsEditing(true)} data-testid="edit-button" className="figma-ml-sm">
                <FontAwesomeIcon icon={"pencil"} className={"figma-icon figma-text-primary"} />
            </span>
        </span>
            )}

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

export default TextAndInput;
