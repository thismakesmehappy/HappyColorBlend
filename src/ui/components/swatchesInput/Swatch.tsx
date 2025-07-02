import React, {useState, useEffect} from "react";
import Chip from "./Chip";
import SwatchProps from "../../interfaces/SwatchProps";
import SwatchControls from "./SwatchControls";
import SwatchLabels from "./SwatchLabels";

const Swatch = ({
                    color,
                    name,
                    canDelete,
                    canPick,
                    className,
                    updateSwatch,
                    id,
                    onDelete,
                    displayOnly = false
                }: SwatchProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [swatchColor, setSwatchColor] = useState(color);
    const [tempSwatchColor, setTempSwatchColor] = useState(color);
    const [swatchName, setSwatchName] = useState(name);
    const [tempSwatchName, setTempSwatchName] = useState(name);
    const [hasUpdated, updateHasUpdated] = useState(false);

    useEffect(() => {
        if (updateSwatch && hasUpdated) {
            updateSwatch(swatchColor, swatchName, id);
        } else {
            updateHasUpdated(true);
        }
    }, [swatchColor, swatchName]);

    useEffect(() => {
        setSwatchColor(color);
        setTempSwatchColor(color);
        setSwatchName(name);
        setTempSwatchName(name);
    }, [color, name]);

    return (
        <div className={('text-center ') + className} data-testid="swatch-container">
            <div className='d-inline-block' data-testid="swatch-chip-container">
                <Chip color={isEditing ? tempSwatchColor : swatchColor} className={"figma-border"} width={75}
                      height={75} data-testid="swatch-chip" />
                {!displayOnly && <SwatchControls
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    canDelete={canDelete}
                    canPick={canPick}
                    swatchColor={swatchColor}
                    setSwatchColor={setSwatchColor}
                    swatchName={swatchName}
                    setSwatchName={setSwatchName}
                    tempSwatchColor={tempSwatchColor}
                    setTempSwatchColor={setTempSwatchColor}
                    tempSwatchName={tempSwatchName}
                    setTempSwatchName={setTempSwatchName}
                    onDelete={id && onDelete ? () => onDelete(id) : undefined}
                />}
            </div>
            <div className={"separator-md"}></div>
            <div data-testid="swatch-labels-container">
                <SwatchLabels isEditing={isEditing}
                              swatchColor={swatchColor}
                              swatchName={swatchName}
                              tempSwatchColor={tempSwatchColor}
                              setTempSwatchColor={setTempSwatchColor}
                              tempSwatchName={tempSwatchName}
                              setTempSwatchName={setTempSwatchName}
                />
            </div>
        </div>
    );
};

export default Swatch;
