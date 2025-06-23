import React from "react";
import useTokenNameStore from "../../store/useTokenNameStore";
import {SelectMenu, SelectMenuOption} from "react-figma-ui";
import {CaseTreatment} from "@ui/helpers/computeTokenName";

"react-figma-ui";

const Case = () => {
    const caseTreatment = useTokenNameStore(state => state.caseTreatment);
    const setCaseTreatment = useTokenNameStore(state => state.setCaseTreatment);

    const caseTreatmentOptions = [
        {label: 'Keep', value: 'keep'},
        {label: 'Lower', value: 'lower'},
        {label: 'Upper', value: 'upper'},
        {label: 'Title', value: 'title'}
    ];
    return (
        <div id="settings-case">
            <SelectMenu
                options={caseTreatmentOptions}
                onChange={(event) => {
                    console.log(event);
                    // setCaseTreatment(value as CaseTreatment)
                }}
                onClick={() => {
                    console.log('value');
                }}
                render={({value, label}) => (
                    <SelectMenuOption value={value} key={value}
                                      onSelect={() => {
                                          console.log('value', value);
                                          setCaseTreatment(value as CaseTreatment)
                                      }
                                      }
                                      onClick={() => {
                                          console.log('value', value);
                                          setCaseTreatment(value as CaseTreatment)
                                      }}
                                      onChange={() => {
                                          console.log('value', value);
                                          setCaseTreatment(value as CaseTreatment)
                                      }}
                    >
                        {label}
                    </SelectMenuOption>
                )}
            />
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
        </div>);

};

export default Case
