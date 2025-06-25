import React from "react";
import {hex} from "wcag-contrast";

interface SwatchColorChipProps {
    color: string;
    step: number;
}

const SwatchColorChip = ({color, step}: SwatchColorChipProps) => {
    const ratioWhite = hex("#FFF", "#" + color);
    const textColor = ratioWhite > 3 ? "#FFFFFF" : "#000000";

    return (
        <div className='color-chip-container' data-testid="swatch-color-chip-container">
            <div
                style={{backgroundColor: "#" + color, color: textColor}}
                className={`color-chip fw-bold`}
                data-testid="swatch-color-chip"
                data-color={color}
                data-step={step}>
                {step.toString().padStart(3, '0')}<br />
                #{color}
            </div>
        </div>
    );
};

export default SwatchColorChip
