import React from "react";
import useSwatchStore, {SwatchStoreSwatch} from "../../store/useSwatchStore";
import {hex} from "wcag-contrast";

interface SwatchColorChipProps {
    color: string;
    step: number;
}

const SwatchColorChip = ({color, step}: SwatchColorChipProps) => {
    const shouldPadZeros = useSwatchStore((state) => state.getShouldPadZeros());
    const ratioWhite = hex("#FFF", "#" + color);
    const textColor = ratioWhite > 3 ? "#FFFFFF" : "#000000";

    return (
        <div className='color-chip-container'>
            <div
                style={{backgroundColor: "#" + color, color: textColor}}
                className={`color-chip fw-bold`}>
                {step.toString().padStart(shouldPadZeros ? 3 : 0, '0')}<br />
                #{color}
            </div>
        </div>
    );
};

export default SwatchColorChip
