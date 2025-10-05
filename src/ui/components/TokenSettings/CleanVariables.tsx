import NumberToggle from "../helpers/NumberToggle";
import Toggle from "../helpers/Toggle";
import React from "react";
import useTokenNameStore from "../../store/useTokenNameStore";

const Separator = () => {
    const keepCSSClean = useTokenNameStore(state => state.keepCSSClean);
    const toggleKeepCSSClean = useTokenNameStore(state => state.toggleKeepCSSClean);
    return (
        <div id="settings-separator">
            <div className="figma-mt-sm">
                <div className="figma-mr-sm d-flex"><Toggle
                    value={keepCSSClean}
                    onChange={toggleKeepCSSClean}
                    className={"d-inline-block figma-mr-sm"}
                />
                    <div className={"d-inline-block"}>Clean up from CSS variables</div>
                </div>

            </div>
        </div>
    );
};

export default Separator
