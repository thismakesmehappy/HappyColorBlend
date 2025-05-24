import FontAwesomeIcon from "../helpers/FontAwesomeIcon";
import React, {useEffect, useState} from "react";
import {isValidHexColor} from "../../helpeers/colorMethods";

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
                        }: SwatchControlsProps) => {

    const [isValidColor, setIsValidColor] = useState(isValidHexColor(tempSwatchColor));
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setIsValidColor(isValidHexColor(tempSwatchColor));
    }, [tempSwatchColor]);

    // Function to show toast and automatically hide it after a delay
    const showToastMessage = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000); // Hide after 3 seconds
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

                {/* Toast notification container */}
                {showToast && (
                    <div className="figma-toast-container">
                        <div className={`figma-toast figma-toast-error show`}>
                            Input should be six digits hex without the #
                        </div>
                    </div>
                )}
            </>
        );
    }
    return (
        <div style={{display: 'flex', justifyContent: alignPencil}}>
            <div onClick={() => setIsEditing(true)}>
                <FontAwesomeIcon icon={"pencil"} className={"figma-icon figma-text-primary"} />
            </div>
            {canDelete &&
                <div>
                    <FontAwesomeIcon icon={"trash"} className={"figma-icon figma-text-primary"} />
                </div>}
        </div>

    );
};

export default SwatchControls
