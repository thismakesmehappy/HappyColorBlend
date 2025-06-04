import FontAwesomeIcon from "../helpers/FontAwesomeIcon";
import React, {useEffect, useState} from "react";
import {isValidHexColor} from "../../helpers/colorMethods";
import Toast from "../helpers/Toast";
import {INVALID_HEX_COLOR_MESSAGE, TOAST_DURATION} from "../../../constants/uiConstants";

interface SwatchControlsProps {
    isEditing: boolean;
    setIsEditing: (newState: any) => void;
    canDelete?: boolean;
    swatchColor: string;
    setSwatchColor: (newState: any) => void;
    swatchName: string;
    setSwatchName: (newState: any) => void;
    tempSwatchColor: string;
    setTempSwatchColor: (newState: any) => void;
    tempSwatchName: string;
    setTempSwatchName: (newState: any) => void;
    onDelete?: () => void;
}

const SwatchControls = ({
                            isEditing,
                            canDelete,
                            setIsEditing,
                            swatchColor,
                            setSwatchColor,
                            swatchName,
                            setSwatchName,
                            tempSwatchColor,
                            setTempSwatchColor,
                            tempSwatchName,
                            setTempSwatchName,
                            onDelete,
                        }: SwatchControlsProps) => {

    const [isValidColor, setIsValidColor] = useState(isValidHexColor(tempSwatchColor));
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setIsValidColor(isValidHexColor(tempSwatchColor));
    }, [tempSwatchColor]);

    // Function to show toast
    const showToastMessage = () => {
        setShowToast(true);
    };

    // Function to hide toast
    const hideToast = () => {
        setShowToast(false);
    };
    const alignPencil = canDelete ? 'space-between' : 'start';
    const update = () => {
        // Only update if the color is valid
        if (isValidHexColor(tempSwatchColor)) {
            setSwatchName(tempSwatchName);
            setSwatchColor(tempSwatchColor);
            setIsEditing(false);
        } else {
            // Show toast notification if color is invalid
            showToastMessage();
        }
    }

    const reset = () => {
        setTempSwatchColor(swatchColor);
        setTempSwatchName(swatchName)
        setIsEditing(false)
    }

    if (isEditing) {
        return (
            <>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div onClick={() => reset()}>
                        <FontAwesomeIcon icon={"circle-xmark"} className={"figma-icon figma-text-primary"} />
                    </div>
                    <div onClick={() => update()}>
                        <FontAwesomeIcon
                            icon={"circle-check"}
                            className={`figma-icon ${isValidColor ? "figma-text-primary" : "figma-text-disabled"}`}
                        />
                    </div>
                </div>

                <Toast
                    message={INVALID_HEX_COLOR_MESSAGE}
                    type="error"
                    duration={TOAST_DURATION}
                    isVisible={showToast}
                    onClose={hideToast}
                />
            </>
        );
    }
    return (
        <div style={{display: 'flex', justifyContent: alignPencil}}>
            <div onClick={() => setIsEditing(true)}>
                <FontAwesomeIcon icon={"pencil"} className={"figma-icon figma-text-primary"} />
            </div>
            {canDelete &&
                <div onClick={onDelete}>
                    <FontAwesomeIcon icon={"trash"} className={"figma-icon figma-text-primary"} />
                </div>}
        </div>

    );
};

export default SwatchControls
