import React, {useState, useEffect} from "react";
import SwatchProps from "../../interfaces/SwatchProps";
import Chip from "@ui/components/SwatchesInput/Chip";
import SwatchLabels from "@ui/components/SwatchesInput/SwatchLabels";

const Swatch = ({
                    color,
                    name,
                    className,
                    updateSwatch,
                    id,
                }: SwatchProps) => {
    const [swatchColor, setSwatchColor] = useState(color);
    const [swatchName, setSwatchName] = useState(name);
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
        setSwatchName(name);
    }, [color, name]);

    return (
        <div className={('text-center ') + className} data-testid="swatch-container">
            <div className='d-inline-block' data-testid="swatch-chip-container">
                <Chip color={swatchColor} className={"figma-border"} width={75}
                      height={75} data-testid="swatch-chip" />
            </div>
            <div className={"separator-md"}></div>
            <div data-testid="swatch-labels-container">
                <SwatchLabels
                    swatchColor={swatchColor}
                    swatchName={swatchName}
                />
            </div>
        </div>
    );
};

export default Swatch;
