import Toggle from "../helpers/Toggle";
import React from "react";
import useSwatchStore from "../../store/useSwatchStore";

export const PadZeros = () => {
    const shouldPadZeros = useSwatchStore((state) => state.shouldPadZeros);
    const flipShouldPadZeros = useSwatchStore((state) => state.flipShouldPadZeros);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    return (
        <div className={""}>
            <div className={'d-inline-block align-middle'}> Pad step numbers with 0</div>
            {' '}
            <Toggle value={shouldPadZeros}
                    onChange={() => {
                        flipShouldPadZeros();
                        buildSwatches();
                    }}
                    className={"d-inline-block align-middle"} />
        </div>
    );
};