import NumberToggle from "../helpers/NumberToggle";
import React from "react";
import useTokenNameStore from "../../store/useTokenNameStore";
import {Col, Row} from "react-bootstrap";

const Separator = () => {
    const separatorCharsCount = useTokenNameStore(state => state.separatorCharsCount);
    const separatorCharType = useTokenNameStore(state => state.separatorCharType);
    // const appendSeparatorToPrimitive = useTokenNameStore(state => state.appendSeparatorToPrimitive);
    const setSeparatorCharType = useTokenNameStore(state => state.setSeparatorCharType);
    // const toggleAppendSeparatorToPrimitive = useTokenNameStore(state => state.toggleAppendSeparatorToPrimitive);
    const incrementSeparatorChars = useTokenNameStore(state => state.incrementSeparatorChars);
    const decrementSeparatorChars = useTokenNameStore(state => state.decrementSeparatorChars);
    return (
        <div id="settings-separator">
            <div className={"figma-mt-sm"}>Separator Character:{" "}
                <NumberToggle
                    decreaseFunction={decrementSeparatorChars}
                    increaseFunction={incrementSeparatorChars}
                    value={separatorCharsCount}
                    minValue={0} /></div>

            <div data-testid="separator-radio text-center" className="figma-mt-sm">
                <Row>
                    <Col>
                        <label className="figma-mr-sm">
                            <input
                                type="radio"
                                name="separator"
                                value="dash"
                                checked={separatorCharType === 'dash'}
                                onChange={() => setSeparatorCharType('dash')}
                                className="form-check-input"
                            />
                            <span>Dash (-)</span>
                        </label>
                    </Col>
                    <Col>
                        <label className="figma-mr-sm">
                            <input
                                type="radio"
                                name="separator"
                                value="underscore"
                                checked={separatorCharType === 'underscore'}
                                onChange={() => setSeparatorCharType('underscore')}
                                className="form-check-input"
                            />
                            <span>Under (_)</span>
                        </label>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Separator
