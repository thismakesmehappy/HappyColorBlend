import NumberToggle from "../helpers/NumberToggle";
import React from "react";
import useTokenNameStore from "../../store/useTokenNameStore";
import Toggle from "@ui/components/helpers/Toggle";
import {Col, Row} from "react-bootstrap";

const Leading = () => {
    const leadingCharsCount = useTokenNameStore(state => state.leadingCharsCount);
    const leadingCharType = useTokenNameStore(state => state.leadingCharType);
    const setLeadingCharType = useTokenNameStore(state => state.setLeadingCharType);
    const incrementLeadingChars = useTokenNameStore(state => state.incrementLeadingChars);
    const decrementLeadingChars = useTokenNameStore(state => state.decrementLeadingChars);
    return (
        <>
            <div id="settings-leading">
                <div className={"figma-mt-sm"}>Leading Character:{" "}
                    <NumberToggle
                        decreaseFunction={decrementLeadingChars}
                        increaseFunction={incrementLeadingChars}
                        value={leadingCharsCount}
                        minValue={0}
                    /></div>


                <div data-testid="leading-radio text-center" className="figma-mt-sm">
                    <Row>
                        <Col>
                            <label className="figma-mr-sm">
                                <input
                                    type="radio"
                                    name="leading"
                                    value="dash"
                                    checked={leadingCharType === 'dash'}
                                    onChange={() => setLeadingCharType('dash')}
                                    className="form-check-input"
                                />
                                <span>Dash (-)</span>
                            </label>
                        </Col>
                        <Col>
                            <label className="figma-mr-sm">
                                <input
                                    type="radio"
                                    name="leading"
                                    value="underscore"
                                    checked={leadingCharType === 'underscore'}
                                    onChange={() => setLeadingCharType('underscore')}
                                    className="form-check-input"
                                />
                                <span>Under (_)</span>
                            </label>
                        </Col>
                    </Row>
                </div>
            </div>

        </>);
};

export default Leading
