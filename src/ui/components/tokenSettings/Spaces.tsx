import React from "react";
import useTokenNameStore from "../../store/useTokenNameStore";

const Spaces = () => {
    const spaceTreatment = useTokenNameStore(state => state.spaceTreatment);
    const setSpaceTreatment = useTokenNameStore(state => state.setSpaceTreatment);
    return (
        <div id="settings-space">
            <div>Spaces:</div>
            <div data-testid="space-treatment-radio">
                <div>
                    <label className="figma-radio figma-mr-md">
                        <input
                            type="radio"
                            name="space-treatment"
                            value="keep"
                            checked={spaceTreatment === 'keep'}
                            onChange={() => setSpaceTreatment('keep')} />
                        <span>Keep</span>
                    </label>
                    <label className="figma-mr-md">
                        <input
                            type="radio"
                            name="space-treatment"
                            value="dash"
                            checked={spaceTreatment === 'dash'}
                            onChange={() => setSpaceTreatment('dash')} />
                        <span>Dash</span>
                    </label>
                </div>
                <div>
                    <label className="figma-mr-md">
                        <input
                            type="radio"
                            name="space-treatment"
                            value="underscore"
                            checked={spaceTreatment === 'underscore'}
                            onChange={() => setSpaceTreatment('underscore')} />
                        <span>Underscore</span>
                    </label>
                    <label className="figma-mr-md">
                        <input
                            type="radio"
                            name="space-treatment"
                            value="remove"
                            checked={spaceTreatment === 'remove'}
                            onChange={() => setSpaceTreatment('remove')} />
                        <span>Remove</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Spaces
