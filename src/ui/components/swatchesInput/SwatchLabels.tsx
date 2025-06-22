import React, {useEffect, useState} from "react";
import {isValidHexColor} from "../../helpers/colorMethods";
import {Input, Type} from "react-figma-ui";

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
        <div className={"vstack"} data-testid="swatch-labels-edit">
            <div>
                <Input className="container-fluid text-center fw-bold" value ={tempSwatchName}
                       onChange={(e) => setTempSwatchName(e.currentTarget.value)}
                       data-testid="swatch-name-input"/>
            </div>
            <div>
                <Input className="container-fluid text-center" value ={tempSwatchColor}
                        onChange={(e) => setTempSwatchColor(e.currentTarget.value)}
                        data-testid="swatch-name-input"/>
            </div>
            <div>{isValidColor}</div>
        </div>
    )

    return (
        <div className={"vstack"} data-testid="swatch-labels-display">
            <Type className="container-fluid fw-bold" data-testid="swatch-name-display">
            {swatchName}
            </Type>
            <Type className="container-fluid"  data-testid="swatch-color-display">
                {swatchColor}</Type>
        </div>
    );
};

export default SwatchLabels
