import React from "react";
import useTokenNameStore from "../../store/useTokenNameStore";
import {Col, Row, Stack} from "react-bootstrap";

const Case = () => {
    const caseTreatment = useTokenNameStore(state => state.caseTreatment);
    const setCaseTreatment = useTokenNameStore(state => state.setCaseTreatment);


    return (
        <div id="settings-case">
            <div>Case:</div>
            <div data-testid="case-treatment-radio">
                <Row xs={2}>
                    <Col>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="case-treatment"
                                value="case"
                                checked={caseTreatment === 'keep'}
                                onChange={() => setCaseTreatment('keep')}
                                id="case-keep"
                            />
                            <label className="form-check-label"
                                   htmlFor="case-keep">
                                Keep
                            </label>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="case-treatment"
                                value="lower"
                                checked={caseTreatment === 'lower'}
                                onChange={() => setCaseTreatment('lower')}
                                id="case-lower"
                            />
                            <label className="form-check-label"
                                   htmlFor="case-lower">
                                Lower
                            </label>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="case-treatment"
                                value="upper"
                                checked={caseTreatment === 'upper'}
                                onChange={() => setCaseTreatment('upper')}
                                id="case-upper"
                            />
                            <label className="form-check-label"
                                   htmlFor="case-upper">
                                Upper
                            </label>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="case-treatment"
                                value="title"
                                checked={caseTreatment === 'title'}
                                onChange={() => setCaseTreatment('title')}
                                id="case-title"
                            />
                            <label className="form-check-label"
                                   htmlFor="case-title">
                                Title
                            </label>
                        </div>
                    </Col>
                </Row>
            </div>

        </div>);

};

export default Case
