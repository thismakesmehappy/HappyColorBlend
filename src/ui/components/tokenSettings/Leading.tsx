import NumberToggle from "../helpers/NumberToggle";
import Section from "../helpers/Section";
import React from "react";
import useTokenNameStore from "../../store/useTokenNameStore";

const Leading = () => {
    const leadingCharsCount = useTokenNameStore(state => state.leadingCharsCount);
    const leadingCharType = useTokenNameStore(state => state.leadingCharType);
    const setLeadingCharType = useTokenNameStore(state => state.setLeadingCharType);
    const incrementLeadingChars = useTokenNameStore(state => state.incrementLeadingChars);
    const decrementLeadingChars = useTokenNameStore(state => state.decrementLeadingChars);
    return (
        <>
            <Section id="settings-leading">
                <div>Leading Character:</div>
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
                    <br />
                    <label className="figma-mr-sm">
                        <input
                            type="radio"
                            name="leading"
                            value="underscore"
                            checked={leadingCharType === 'underscore'}
                            onChange={() => setLeadingCharType('underscore')} />
                        <span>Underscore (_)</span>
                    </label>
                </div>
            </Section>
        </>);
};

export default Leading
