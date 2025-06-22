import React, {useState, useEffect} from 'react';
import FontAwesomeIcon from "../helpers/FontAwesomeIcon";
import Toast from "../helpers/Toast";
import {INVALID_HEX_COLOR_MESSAGE, TOAST_DURATION} from "../../../constants/uiConstants";
import {ClassAndStyle} from "../../interfaces/ClassAndStyle";
import {Input, Type} from "react-figma-ui";

interface TextAndInputProps extends ClassAndStyle {
    inputText: string;
    setInputText: (value: string) => void;
}


const TextAndInput = ({className = '', style = {}, inputText, setInputText}: TextAndInputProps) => {

    // State for neutral ramp name editing
    const [isEditing, setIsEditing] = useState(false);
    const [tempText, setTempText] = useState(inputText);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    ;

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

    return (
        <div className={className}
             style={style}>

            {isEditing ? (
                <span>
                     <Input className="container-fluid" value ={tempText}
                            onChange={(e) => setTempText(e.currentTarget.value)}
                            data-testid="swatch-name-input"/>

                  <>
                    <span onClick={() => cancelEdit()} data-testid="cancel-button" className="figma-mr-sm">
                        <FontAwesomeIcon icon={"circle-xmark"} className={"figma-icon figma-text-primary"} />
                    </span>
                    <span onClick={() => updateText()} data-testid="save-button">
                        <FontAwesomeIcon
                            icon={"circle-check"}
                            className={`figma-icon ${isValidText(tempText) ? "figma-text-primary" : "figma-text-disabled"}`}
                        />
                    </span>

            </>
                  </span>
            ) : (
                <span>
                    <Type className="fw-bold">{inputText}</Type>
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
