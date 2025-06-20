import React, { useMemo } from "react";
import {hex} from "wcag-contrast";

interface SwatchColorChipProps {
    color: string;
    step: number;
}

const SwatchColorChip = React.memo(({color, step}: SwatchColorChipProps) => {
    const textColor = useMemo(() => {
        const ratioWhite = hex("#FFF", "#" + color);
        return ratioWhite > 3 ? "#FFFFFF" : "#000000";
    }, [color]);

    const formattedStep = useMemo(() => {
        return step.toString().padStart(3, '0');
    }, [step]);

    return (
        <div className='color-chip-container' data-testid="swatch-color-chip-container">
            <div
                style={{backgroundColor: "#" + color, color: textColor}}
                className={`color-chip fw-bold`}
                data-testid="swatch-color-chip"
                data-color={color}
                data-step={step}>
                {formattedStep}<br />
                #{color}
            </div>
        </div>
    );
});

export default SwatchColorChip
