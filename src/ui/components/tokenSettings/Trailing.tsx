import NumberToggle from "../helpers/NumberToggle";
import React from "react";
import useTokenNameStore from "../../store/useTokenNameStore";

const Trailing = () => {
    const trailingCharsCount = useTokenNameStore(state => state.trailingCharsCount);
    const trailingCharType = useTokenNameStore(state => state.trailingCharType);
    const setTrailingCharType = useTokenNameStore(state => state.setTrailingCharType);
    const incrementTrailingChars = useTokenNameStore(state => state.incrementTrailingChars);
    const decrementTrailingChars = useTokenNameStore(state => state.decrementTrailingChars);
    return (
        <div id="settings-trailing">
            <div>Trailing Character:</div>
            <NumberToggle
                decreaseFunction={decrementTrailingChars}
                increaseFunction={incrementTrailingChars}
                value={trailingCharsCount}
                minValue={0} />
            <div data-testid="trailing-radio text-center" className="figma-mt-sm">
                <label className="figma-mr-sm">
                    <input
                        type="radio"
                        name="trailing"
                        value="dash"
                        checked={trailingCharType === 'dash'}
                        onChange={() => setTrailingCharType('dash')} />
                    <span>Dash (-)</span>
                </label>
                <br />
                <label className="figma-mr-sm">
                    <input
                        type="radio"
                        name="trailing"
                        value="underscore"
                        checked={trailingCharType === 'underscore'}
                        onChange={() => setTrailingCharType('underscore')} />
                    <span>Underscore (_)</span>
                </label>
            </div>
        </div>
    );
};

export default Trailing
