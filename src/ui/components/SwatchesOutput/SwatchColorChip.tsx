import React from "react";
import {hex} from "wcag-contrast";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import {Col} from "react-bootstrap";

interface SwatchColorChipProps extends ClassAndStyle {
    color: string;
    step?: number;
    name?: string
}

const SwatchColorChip = ({color, step, name, className, style}: SwatchColorChipProps) => {
    const ratioWhite = hex("#FFF", "#" + color);
    const textColor = ratioWhite > 3 ? "#FFFFFF" : "#000000";

    return (
        <Col>
            <div
                style={{backgroundColor: "#" + color, color: textColor}}
                className={`color-chip selectable-text py-2`}
                data-testid="swatch-color-chip"
                data-color={color}
                data-step={step}>
                {name &&
                    <>{name}<br /></>}
                {step &&
                    <>{step.toString().padStart(3, '0')}<br /></>}
                #{color}
            </div>
        </Col>
    );
};

export default SwatchColorChip
