import FontAwesomeIcon from "../helpers/FontAwesomeIcon";
import React from "react";

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
                            setTempSwatchName
                        }: SwatchControlsProps) => {
    const alignPencil = canDelete ? 'space-between' : 'start';
    const update = () => {
        setSwatchName(tempSwatchName);
        setSwatchColor(tempSwatchColor);
        setIsEditing(false);
    }

    const reset = () => {
        setTempSwatchColor(swatchColor);
        setTempSwatchName(swatchName)
        setIsEditing(false)
    }

    if (isEditing) {
        return (
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div onClick={() => reset()}>
                    <FontAwesomeIcon icon={"circle-xmark"} className={"figma-icon figma-text-primary"} />
                </div>
                <div onClick={() => update()}>
                    <FontAwesomeIcon icon={"circle-check"} className={"figma-icon figma-text-primary"} />
                </div>
            </div>

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
