import Accordion from "react-bootstrap/Accordion";
import {PRESETS} from "../../../consts/valueConsts.ts";
import useSteps from "../../hooks/useSteps.ts";
import {useState} from "react";

const StepsInput = () => {
    const {addSteps} = useSteps();
    const [step, setStep] = useState('')
    return (
        <div className={'row vstack gap-1'}>
            <p className={'mb-1'}>
                Add or remove steps (numbers from 0 – 1000) with the input below. You may enter a single value, or multiple comma-separated numbers.
            </p>
            <div className={"row"}>
                <div className={'col col-2'}>
                    <input type="text" value={step}
                           className={'no-resize w-100'}
                           onChange={event => {
                               // verify it's a valid number
                               setStep(event.target.value)
                           }}
                    />
                </div>
                <div className={'col col-1'}>
                    <button className={'btn btn-primary w-100'} onClick={() => addSteps(step)}>Add steps</button>
                </div>
            </div>

            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Presets</Accordion.Header>
                    <Accordion.Body>
                        Select a preset to add the steps to the list
                        <ul className={'list-unstyled'}>
                            {PRESETS.map((preset, index) =>
                                <li key={index}>
                                    <a href={'#'}
                                       onClick={() => addSteps(preset.values)}
                                    >
                                        {preset.name}
                                    </a> {preset.showValues && "(" + preset.values + ")"}
                                </li>
                            )}
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
        ;
};

export default StepsInput;