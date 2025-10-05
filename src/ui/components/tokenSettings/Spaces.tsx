import React from "react";
import useTokenNameStore from "../../store/useTokenNameStore";
import {Col, Row} from "react-bootstrap";

const Spaces = () => {
    const spaceTreatment = useTokenNameStore(state => state.spaceTreatment);
    const setSpaceTreatment = useTokenNameStore(state => state.setSpaceTreatment);
    return (
        <div id="settings-space">
            <div className={"figma-mt-sm"}>Spaces:</div>
            <div data-testid="space-treatment-radio" className={"form-check"}>
                <Row xs={2}>
                    <Col>
                        <label className="figma-radio figma-mr-md">
                            <input
                                type="radio"
                                name="space-treatment"
                                value="keep"
                                checked={spaceTreatment === 'keep'}
                                onChange={() => setSpaceTreatment('keep')}
                                className="form-check-input"
                            />
                            <span>Keep</span>
                        </label>
                    </Col>
                    <Col>
                        <label className="figma-mr-md">
                            <input
                                type="radio"
                                name="space-treatment"
                                value="remove"
                                checked={spaceTreatment === 'remove'}
                                onChange={() => setSpaceTreatment('remove')}
                                className="form-check-input"
                            />
                            <span>Remove</span>
                        </label>
                    </Col>
                    <Col>
                        <label className="figma-mr-md">
                            <input
                                type="radio"
                                name="space-treatment"
                                value="dash"
                                checked={spaceTreatment === 'dash'}
                                onChange={() => setSpaceTreatment('dash')}
                                className="form-check-input"
                            />
                            <span>Dash (-)</span>
                        </label>
                    </Col>
                    <Col>
                        <label className="figma-mr-md">
                            <input
                                type="radio"
                                name="space-treatment"
                                value="underscore"
                                checked={spaceTreatment === 'underscore'}
                                onChange={() => setSpaceTreatment('underscore')}
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

export default Spaces
