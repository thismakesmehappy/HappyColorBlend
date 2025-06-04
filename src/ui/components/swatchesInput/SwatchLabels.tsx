import React, {useEffect, useState} from "react";
import {isValidHexColor} from "../../helpers/colorMethods";

interface SwatchLabelsProps {
    isEditing: boolean;
    swatchColor: string;
    swatchName: string;
    tempSwatchColor: string;
    setTempSwatchColor: (newState: any) => void;
    tempSwatchName: string;
    setTempSwatchName: (newState: any) => void;
}

const SwatchLabels = ({
                          isEditing,
                          swatchColor,
                          swatchName,
                          tempSwatchColor,
                          setTempSwatchColor,
                          tempSwatchName,
                          setTempSwatchName,
                      }: SwatchLabelsProps) => {

    const [isValidColor, setIsValidColor] = useState(isValidHexColor(tempSwatchColor))


    useEffect(() => {
        setIsValidColor(isValidHexColor(tempSwatchColor));
    }, [tempSwatchColor]);


    if (isEditing) return (
        <div className={"vstack"}>
            <div>
                <input type="text" className="swatch-label figma-input mw-100" value={tempSwatchName}
                       onChange={(e) => setTempSwatchName(e.target.value)} />
            </div>
            <div>
                <input
                    type="text"
                    className={`swatch-label figma-input mw-100 ${!isValidColor ? 'border-danger' : ''}`}
                    value={tempSwatchColor}
                    onChange={(e) => setTempSwatchColor(e.target.value)}
                />
            </div>
            <div>{isValidColor}</div>
        </div>
    )

    return (
        <div className={"vstack"}>
            <div className="swatch-label swatch-label-text mw-100 d-inline-block fw-bold">{swatchName}</div>
            <div className="swatch-label swatch-label-text mw-100 d-inline-block">{swatchColor}</div>
            <div>{isValidColor}</div>
        </div>
    );
};

export default SwatchLabels
