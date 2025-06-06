import React from "react";

function ChipOutput(props: { color: string }) {
    return <span
        className={"figma-mr-sm"}
        style={{
            backgroundColor: `#${props.color}`,
            width: "1em",
            height: ".75em",
            display: "inline-block",
        }}> </span>;
}

export default ChipOutput
