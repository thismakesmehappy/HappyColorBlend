import FontAwesomeIcon from "../helpers/FontAwesomeIcon";
import React, {useEffect, useState} from "react";
import {isValidHexColor} from "../../helpers/colorMethods";
import Toast from "../helpers/Toast";
import {INVALID_HEX_COLOR_MESSAGE, TOAST_DURATION} from "../../../constants/uiConstants";
import {UI_CHANNEL} from "@ui/app.network";
import {PLUGIN} from "@common/networkSides";
import ColorNamer from 'color-namer';

interface SwatchControlsProps {
    isEditing: boolean;
    setIsEditing: (newState: any) => void;
    canDelete?: boolean;
    canPick?: boolean;
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
                            canPick,
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
    const [showEyeDropperToast, setShowEyeDropperToast] = useState(false);
    const [eyeDropperToastMessage, setEyeDropperToastMessage] = useState("");

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

    // Function to hide eye-dropper toast
    const hideEyeDropperToast = () => {
        setShowEyeDropperToast(false);
    };

    // Eye-dropper click handler
    const extractSingleColorFromSelection = async () => {
        try {
            const extractedColor = await UI_CHANNEL.request(PLUGIN, "extractSingleColorFromSelection", []);
            const colorName = ColorNamer(`#${extractedColor.color}`).ntc[0].name;
            setSwatchColor(extractedColor.color);
            setSwatchName(colorName);
        } catch (error) {
            console.error('Failed to extract single color from selection:', error);
            setEyeDropperToastMessage(error instanceof Error ? error.message : 'Failed to extract color from selection.');
            setShowEyeDropperToast(true);
        }
    };
    const alignPencil = canDelete || canPick ? 'space-between' : 'start';
    const update = () => {
        // Only update if the color is valid
        if (isValidHexColor(tempSwatchColor)) {
            setSwatchName(tempSwatchName);
            setSwatchColor(tempSwatchColor.toUpperCase());
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
                    <div onClick={() => reset()} data-testid="cancel-button">
                        <FontAwesomeIcon icon={"circle-xmark"} className={"figma-icon figma-text-primary"} />
                    </div>
                    <div onClick={() => update()} data-testid="save-button">
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
        <>
            <div style={{display: 'flex', justifyContent: alignPencil}}>
                <div onClick={() => setIsEditing(true)} data-testid="edit-button">
                    <FontAwesomeIcon icon={"pencil"} className={"figma-icon figma-text-primary"} />
                </div>
                {canPick &&
                    <div onClick={extractSingleColorFromSelection} data-testid="eyedropped-button">
                        <FontAwesomeIcon icon={"eye-dropper"} className={"figma-icon figma-text-primary"} />
                    </div>
                }
                {canDelete &&
                    <div onClick={onDelete} data-testid="delete-button">
                        <FontAwesomeIcon icon={"trash"} className={"figma-icon figma-text-primary"} />
                    </div>}
            </div>

            <Toast
                message={eyeDropperToastMessage}
                type="error"
                duration={TOAST_DURATION}
                isVisible={showEyeDropperToast}
                onClose={hideEyeDropperToast}
            />
        </>
    );
};

export default SwatchControls
