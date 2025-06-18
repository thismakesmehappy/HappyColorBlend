import Toggle from "../helpers/Toggle";
import React from "react";
import useSwatchStore from "../../store/useSwatchStore";
import {ClassAndStyle} from "../../interfaces/ClassAndStyle";

export const PadZeros = ({className = "", style = {}}: ClassAndStyle) => {
    const shouldPadZeros = useSwatchStore((state) => state.shouldPadZeros);
    const flipShouldPadZeros = useSwatchStore((state) => state.flipShouldPadZeros);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    return (
        <div className={className} style={style} data-testid="pad-zeros">
            <div className={'d-inline-block align-middle'} data-testid="pad-zeros-label"> Pad step <br />numbers with 0
            </div>
            {' '}
            <Toggle
                value={shouldPadZeros}
                onChange={() => {
                    flipShouldPadZeros();
                    buildSwatches();
                }}
                className={"d-inline-block align-middle"}
                data-testid="pad-zeros-toggle"
            />
        </div>
    );
};