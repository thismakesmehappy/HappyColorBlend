import NumberToggle from "../helpers/NumberToggle";
import Toggle from "../helpers/Toggle";
import React from "react";
import useTokenNameStore from "../../store/useTokenNameStore";

const Separator = () => {
    const separatorCharsCount = useTokenNameStore(state => state.separatorCharsCount);
    const separatorCharType = useTokenNameStore(state => state.separatorCharType);
    const appendSeparatorToPrimitive = useTokenNameStore(state => state.appendSeparatorToPrimitive);
    const setSeparatorCharType = useTokenNameStore(state => state.setSeparatorCharType);
    const toggleAppendSeparatorToPrimitive = useTokenNameStore(state => state.toggleAppendSeparatorToPrimitive);
    const incrementSeparatorChars = useTokenNameStore(state => state.incrementSeparatorChars);
    const decrementSeparatorChars = useTokenNameStore(state => state.decrementSeparatorChars);
    return (
        <div id="settings-separator">
            <div className={"figma-mt-sm"}>Separator Character:</div>
            <NumberToggle
                decreaseFunction={decrementSeparatorChars}
                increaseFunction={incrementSeparatorChars}
                value={separatorCharsCount}
                minValue={0} />
            <div data-testid="separator-radio text-center" className="figma-mt-sm">
                <label className="figma-mr-sm">
                    <input
                        type="radio"
                        name="separator"
                        value="dash"
                        checked={separatorCharType === 'dash'}
                        onChange={() => setSeparatorCharType('dash')} />
                    <span>Dash (-)</span>
                </label>
                <label className="figma-mr-sm">
                    <input
                        type="radio"
                        name="separator"
                        value="underscore"
                        checked={separatorCharType === 'underscore'}
                        onChange={() => setSeparatorCharType('underscore')} />
                    <span>Under (_)</span>
                </label>
            </div>
            <div className="figma-mt-sm">
                <div className="figma-mr-sm d-flex"><Toggle
                    value={appendSeparatorToPrimitive}
                    onChange={toggleAppendSeparatorToPrimitive}
                    className={"d-inline-block figma-mr-sm"}
                />
                    <div className={"d-inline-block"}>Append to primitives</div>
                </div>

            </div>
        </div>
    );
};

export default Separator
