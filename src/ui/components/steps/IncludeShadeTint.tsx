import Toggle from "../helpers/Toggle";
import React from "react";
import useSwatchStore from "../../store/useSwatchStore";
import {ClassAndStyle} from "../../interfaces/ClassAndStyle";

export const IncludeShadeTint = ({className = "", style = {}}: ClassAndStyle) => {
    const includeShadeTint = useSwatchStore((state) => state.includeShadeTint);
    const flipIncludeShadeTint = useSwatchStore((state) => state.flipIncludeShadeTint);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    return (
        <div className={className} style={style} data-testid="include-shade-tint">
            <div className={'d-inline-block align-middle'}
                 data-testid="include-shade-tint-label"> Include tint <br />and shade
            </div>
            {' '}
            <Toggle
                value={includeShadeTint}
                onChange={() => {
                    flipIncludeShadeTint();
                    buildSwatches();
                }}
                className={"d-inline-block align-middle"}
                data-testid="include-shade-tint-toggle"
            />
        </div>
    );
};