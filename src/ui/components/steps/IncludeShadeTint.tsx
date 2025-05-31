import Toggle from "../helpers/Toggle";
import React from "react";
import useSwatchStore from "../../store/useSwatchStore";

export const IncludeShadeTint = () => {
    const includeShadeTint = useSwatchStore((state) => state.includeShadeTint);
    const flipIncludeShadeTint = useSwatchStore((state) => state.flipIncludeShadeTint);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    return (
        <div className={""}>
            <div className={'d-inline-block align-middle'}> Include tint and shade</div>
            {' '}
            <Toggle value={includeShadeTint}
                    onChange={() => {
                        flipIncludeShadeTint();
                        buildSwatches();
                    }}
                    className={"d-inline-block align-middle"} />
        </div>
    );
};