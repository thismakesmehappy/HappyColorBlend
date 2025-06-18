import React from "react";
import {hex} from "wcag-contrast";
import {ClassAndStyle} from "../../interfaces/ClassAndStyle";

interface ChipOutputProps extends ClassAndStyle {
    color: string;
}

function ChipOutput({color, className = "", style = {}}: ChipOutputProps) {
    const ratio = hex(color, "#FFFFFF");
    const combinedStyle = {
        backgroundColor: `#${color}`,
        width: "1em",
        height: ".75em",
        display: "inline-block",
        ...style
    }
    return <span
        data-testid="chip-output"
        className={`figma-mr-sm ${ratio < 3 && 'figma-border'} ${className}`}
        style={combinedStyle}> </span>;
}

export default ChipOutput
