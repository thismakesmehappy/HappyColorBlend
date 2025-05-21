import React from "react";

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
                          setTempSwatchName
                      }: SwatchLabelsProps) => {

    if (isEditing) return (
        <>
            <div>
                <input type="text" className="swatch-label" value={tempSwatchName}
                       onChange={(e) => setTempSwatchName(e.target.value)} />
            </div>
            <div>
                <input type="text" className="swatch-label" value={tempSwatchColor}
                       onChange={(e) => setTempSwatchColor(e.target.value)} />
            </div>
        </>
    )

    return (
        <>
            <div className="swatch-label">{swatchName}</div>
            <div className="swatch-label">{swatchColor}</div>
        </>
    );
};

export default SwatchLabels
