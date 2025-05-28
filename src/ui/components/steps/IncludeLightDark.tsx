import Toggle from "../helpers/Toggle";
import React from "react";
import useSwatchStore from "../../store/useSwatchStore";

export const IncludeLightDark = () => {
    const includeDarkLight = useSwatchStore((state) => state.includeDarkLight);
    const flipIncludeDarkLight = useSwatchStore((state) => state.flipIncludeDarkLight);
    return (
        <div className={""}>
            <div className={'d-inline-block align-middle'}> Include light and dark</div>
            {' '}
            <Toggle value={includeDarkLight}
                    onChange={flipIncludeDarkLight}
                    className={"d-inline-block align-middle"} />
        </div>
    );
};