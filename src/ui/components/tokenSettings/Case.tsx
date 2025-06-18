import React from "react";
import useTokenNameStore from "../../store/useTokenNameStore";
import Section from "../helpers/Section";

const Case = () => {
    const caseTreatment = useTokenNameStore(state => state.caseTreatment);
    const setCaseTreatment = useTokenNameStore(state => state.setCaseTreatment);
    return (
        <Section id="settings-case">
            <div>Case:</div>
            <div>
                <div data-testid="case-treatment-radio">
                    <label className="figma-mr-md">
                        <input
                            type="radio"
                            name="case-treatment"
                            value="keep"
                            checked={caseTreatment === 'keep'}
                            onChange={() => setCaseTreatment('keep')} />
                        <span>Keep</span>
                    </label>

                    <label className="figma-mr-md">
                        <input
                            type="radio"
                            name="case-treatment"
                            value="lower"
                            checked={caseTreatment === 'lower'}
                            onChange={() => setCaseTreatment('lower')} />
                        <span>Lower</span>
                    </label>
                </div>
                <div>
                    <label className="figma-mr-md">
                        <input
                            type="radio"
                            name="case-treatment"
                            value="upper"
                            checked={caseTreatment === 'upper'}
                            onChange={() => setCaseTreatment('upper')} />
                        <span>Upper</span>
                    </label>
                    <label className="figma-mr-md">
                        <input
                            type="radio"
                            name="case-treatment"
                            value="title"
                            checked={caseTreatment === 'title'}
                            onChange={() => setCaseTreatment('title')} />
                        <span>Title</span>
                    </label>
                </div>
            </div>
        </Section>);

};

export default Case
