import React from "react";
import useTokenNameStore from "../../store/useTokenNameStore";

const Spaces = () => {
    const spaceTreatment = useTokenNameStore(state => state.spaceTreatment);
    const setSpaceTreatment = useTokenNameStore(state => state.setSpaceTreatment);
    return (
        <>
            <div className="figma-mt-sm">Spaces:</div>
            <div>
                <div data-testid="space-treatment-radio">
                    <label className="figma-radio figma-mr-sm">
                        <input
                            type="radio"
                            name="space-treatment"
                            value="keep"
                            checked={spaceTreatment === 'keep'}
                            onChange={() => setSpaceTreatment('keep')} />
                        <span>Keep</span>
                    </label>
                    <label className="figma-mr-sm">
                        <input
                            type="radio"
                            name="space-treatment"
                            value="dash"
                            checked={spaceTreatment === 'dash'}
                            onChange={() => setSpaceTreatment('dash')} />
                        <span>Dash</span>
                    </label>
                    <label className="figma-mr-sm">
                        <input
                            type="radio"
                            name="space-treatment"
                            value="underscore"
                            checked={spaceTreatment === 'underscore'}
                            onChange={() => setSpaceTreatment('underscore')} />
                        <span>Underscore</span>
                    </label>
                    <label>
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
        </>);
};

export default Spaces
