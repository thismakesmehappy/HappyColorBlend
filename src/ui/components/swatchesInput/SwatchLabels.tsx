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
    onSave?: () => void;
    onCancel?: () => void;
}

const SwatchLabels = ({
                          isEditing,
                          swatchColor,
                          swatchName,
                          tempSwatchColor,
                          setTempSwatchColor,
                          tempSwatchName,
                          setTempSwatchName,
                          onSave,
                          onCancel,
                      }: SwatchLabelsProps) => {

    const [isValidColor, setIsValidColor] = useState(isValidHexColor(tempSwatchColor))


    useEffect(() => {
        setIsValidColor(isValidHexColor(tempSwatchColor));
    }, [tempSwatchColor]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSave?.();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            onCancel?.();
        }
    };

    if (isEditing) return (
        <div className={"vstack"} data-testid="swatch-labels-edit">
            <div>
                <input className="container-fluid text-center fw-bold" value={tempSwatchName}
                       onChange={(e) => setTempSwatchName(e.currentTarget.value)}
                       onKeyDown={handleKeyDown}
                       data-testid="swatch-name-input" />
            </div>
            <div>
                <input className={`container-fluid text-center ${!isValidColor ? 'border-danger' : ''}`}
                       value={tempSwatchColor}
                       onChange={(e) => setTempSwatchColor(e.currentTarget.value)}
                       onKeyDown={handleKeyDown}
                       data-testid="swatch-color-input" />
            </div>
            <div>{isValidColor}</div>
        </div>
    )

    return (
        <div className={"vstack"} data-testid="swatch-labels-display">
            <p className="container-fluid fw-bold mb-0" data-testid="swatch-name-display">
                {swatchName}
            </p>
            <p className="container-fluid" data-testid="swatch-color-display">
                #{swatchColor}</p>
        </div>
    );
};

export default SwatchLabels
