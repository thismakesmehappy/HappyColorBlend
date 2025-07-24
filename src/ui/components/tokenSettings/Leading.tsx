import NumberToggle from "../helpers/NumberToggle";
import React from "react";
import useTokenNameStore from "../../store/useTokenNameStore";
import Toggle from "@ui/components/helpers/Toggle";

const Leading = () => {
    const leadingCharsCount = useTokenNameStore(state => state.leadingCharsCount);
    const leadingCharType = useTokenNameStore(state => state.leadingCharType);
    const setLeadingCharType = useTokenNameStore(state => state.setLeadingCharType);
    const incrementLeadingChars = useTokenNameStore(state => state.incrementLeadingChars);
    const decrementLeadingChars = useTokenNameStore(state => state.decrementLeadingChars);
    const keepCSSClean = useTokenNameStore(state => state.keepCSSClean);
    const toggleKeepCSSClean = useTokenNameStore(state => state.toggleKeepCSSClean);
    return (
        <>
            <div id="settings-leading">
                <div className={"figma-mt-sm"}>Leading Character:</div>
                <NumberToggle
                    decreaseFunction={decrementLeadingChars}
                    increaseFunction={incrementLeadingChars}
                    value={leadingCharsCount}
                    minValue={0}
                />
                <div data-testid="leading-radio text-center" className="figma-mt-sm">
                    <label className="figma-mr-sm">
                        <input
                            type="radio"
                            name="leading"
                            value="dash"
                            checked={leadingCharType === 'dash'}
                            onChange={() => setLeadingCharType('dash')} />
                        <span>Dash (-)</span>
                    </label>
                    <label className="figma-mr-sm">
                        <input
                            type="radio"
                            name="leading"
                            value="underscore"
                            checked={leadingCharType === 'underscore'}
                            onChange={() => setLeadingCharType('underscore')} />
                        <span>Under (_)</span>
                    </label>
                </div>
            </div>
            <div className="figma-mt-sm">
                <div className="figma-mr-sm d-flex"><Toggle
                    value={!keepCSSClean}
                    onChange={toggleKeepCSSClean}
                    className={"d-inline-block figma-mr-sm"}
                />
                    <div className={"d-inline-block"}>Append to CSS vars</div>
                </div>

            </div>
        </>);
};

export default Leading
