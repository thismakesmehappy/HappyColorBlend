import NumberToggle from "../helpers/NumberToggle";
import Section from "../helpers/Section";
import React from "react";
import useTokenNameStore from "../../store/useTokenNameStore";

const Trailing = () => {
    const trailingCharsCount = useTokenNameStore(state => state.trailingCharsCount);
    const trailingCharType = useTokenNameStore(state => state.trailingCharType);
    const setTrailingCharType = useTokenNameStore(state => state.setTrailingCharType);
    const incrementTrailingChars = useTokenNameStore(state => state.incrementTrailingChars);
    const decrementTrailingChars = useTokenNameStore(state => state.decrementTrailingChars);
    return (
        <>
            <Section id="settings-trailing">
                <div>Trailing:</div>
                <NumberToggle
                    decreaseFunction={decrementTrailingChars}
                    increaseFunction={incrementTrailingChars}
                    value={trailingCharsCount}
                    minValue={0} />
                <div data-testid="trailing-radio text-center">
                    <label className="figma-mr-sm">
                        <input
                            type="radio"
                            name="trailing"
                            value="dash"
                            checked={trailingCharType === 'dash'}
                            onChange={() => setTrailingCharType('dash')} />
                        <span>-</span>
                    </label>
                    <label className="figma-mr-sm">
                        <input
                            type="radio"
                            name="trailing"
                            value="underscore"
                            checked={trailingCharType === 'underscore'}
                            onChange={() => setTrailingCharType('underscore')} />
                        <span>_</span>
                    </label>
                </div>
            </Section>
        </>
    );
};

export default Trailing
