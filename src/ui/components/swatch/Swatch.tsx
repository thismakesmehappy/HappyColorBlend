import React, {useState, useEffect} from "react";
import Chip from "./Chip";
import SwatchProps from "../../interfaces/SwatchProps";
import SwatchControls from "./SwatchControls";
import SwatchLabels from "./SwatchLabels";

const Swatch = ({color, name, canDelete, display, horizontal, className, updateSwatch, id}: SwatchProps) => {
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

    return (
        <div className={(horizontal && "hstack " || 'text-center ') + className}>
            <div className='d-inline-block'>
                <Chip color={isEditing ? tempSwatchColor : swatchColor} className={"figma-border"} width={75}
                      height={75} />
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
                    />
                }
            </div>
            <div className={"separator-md"}></div>
            <div>
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
