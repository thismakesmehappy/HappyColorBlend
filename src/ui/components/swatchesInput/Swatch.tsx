import React, {useState, useEffect} from "react";
import Chip from "./Chip";
import SwatchProps from "../../interfaces/SwatchProps";
import SwatchControls from "./SwatchControls";
import SwatchLabels from "./SwatchLabels";

const Swatch = ({color, name, canDelete, display, horizontal, className, updateSwatch, id, onDelete}: SwatchProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [swatchColor, setSwatchColor] = useState(color);
    const [tempSwatchColor, setTempSwatchColor] = useState(color);
    const [swatchName, setSwatchName] = useState(name);
    const [tempSwatchName, setTempSwatchName] = useState(name);
    const [hasUpdated, updateHasUpdated] = useState(false);

    useEffect(() => {
        console.log("triggered update " + hasUpdated)
        if (hasUpdated) {
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
        <div className={(horizontal && "hstack " || 'text-center ') + className} data-testid="swatch-container">
            <div className='d-inline-block' data-testid="swatch-chip-container">
                <Chip color={isEditing ? tempSwatchColor : swatchColor} className={"figma-border"} width={75}
                      height={75} data-testid="swatch-chip" />
                {!display &&
                    <SwatchControls
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        canDelete={canDelete}
                        swatchColor={swatchColor}
                        setSwatchColor={setSwatchColor}
                        swatchName={swatchName}
                        setSwatchName={setSwatchName}
                        tempSwatchColor={tempSwatchColor}
                        setTempSwatchColor={setTempSwatchColor}
                        tempSwatchName={tempSwatchName}
                        setTempSwatchName={setTempSwatchName}
                        onDelete={id && onDelete ? () => onDelete(id) : undefined}
                    />
                }
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
