import TextareaAutosize from "react-textarea-autosize";
import Accordion from "react-bootstrap/Accordion";
import {PRESETS} from "../../../consts/valueConsts.ts";

interface Props {
    steps: string;
    setSteps: (steps: string) => void;
}

// @ts-ignore
const StepsInput = ({steps, setSteps}: Props) => {
    return (
        <div className={'row vstack gap-1'}>
            <p className={'mb-1'}>
                Add or remove comma-separated values (0 – 1000) for the tints and shades to create.
            </p>
            <TextareaAutosize value={steps}
                              className={'no-resize'}
                              onChange={event =>
                                  setSteps(event.target.value)}
            />
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Presets (will override list)</Accordion.Header>
                    <Accordion.Body>
                        <ul className={'list-unstyled'}>
                            {PRESETS.map((preset, index) =>
                                <li key={index}>
                                    <a href={'#'}
                                       onClick={() => setSteps(preset.values)}
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
    );
};

export default StepsInput;