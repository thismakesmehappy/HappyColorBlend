import React from "react";
import {hex} from "wcag-contrast";

function ChipOutput(props: { color: string }) {
    const ratio = hex(props.color, "#FFFFFF");
    return <span
        data-testid="chip-output"
        className={`figma-mr-sm ${ratio < 3 && 'figma-border'}`}
        style={{
            backgroundColor: `#${props.color}`,
            width: "1em",
            height: ".75em",
            display: "inline-block",
        }}> </span>;
}

export default ChipOutput
