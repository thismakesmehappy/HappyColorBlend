import Explain from "@ui/components/helpers/Explain";
import {Col, Form, FormControl, FormGroup, FormLabel, InputGroup, Row} from "react-bootstrap";
import React, {useState} from "react";
import useSwatchStore from "@ui/store/useSwatchStore";
import FontAwesomeIcon from "@ui/components/helpers/FontAwesomeIcon";
import Group from "@ui/components/helpers/Group";
import Button from "@ui/components/helpers/Button";
import ColorInput from "@ui/components/helpers/ColorInput";

const TintAndShade = () => {
    const start = useSwatchStore((state) => state.scaleStart);
    const updateStart = useSwatchStore((state) => state.setScaleStart);
    const end = useSwatchStore((state) => state.scaleEnd);
    const updateEnd = useSwatchStore((state) => state.setScaleEnd);
    const swapStartEnd = useSwatchStore((state) => state.swapScaleEndpoints);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    const buildColorScales = useSwatchStore((state) => state.buildColorScale);
    const neutral = useSwatchStore((state) => state.neutralScaleName);
    const updateNeutral = useSwatchStore((state) => state.setNeutralScaleName);


    const [neutralName, setNeutralName] = useState(neutral);

    const handleNeutralSubmit = () => {
        updateNeutral(neutralName);
        buildSwatches();
    }

    const handleNeutralReset = () => {
        setNeutralName(neutral);
    }

    const handleSwapStartEnd = () => {
        swapStartEnd();
        buildSwatches();
        buildColorScales();
    }


    const handleUpdateStart = (name: string, hex: string) => {
        const normalizedColorHex = hex.toUpperCase();
        updateStart(normalizedColorHex, name);
        buildSwatches();
        buildColorScales();
    }

    const handleUpdateEnd = (name: string, hex: string) => {
        const normalizedColorHex = hex.toUpperCase();
        updateEnd(normalizedColorHex, name);
        buildSwatches();
        buildColorScales();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (<>
        <Explain>Customize the colors used to mix the tints and shades.</Explain>
        <Group>
            <ColorInput
                title={"Start (0)"}
                onSubmit={handleUpdateStart}
                nameSource={start.name}
                hexSource={start.color}
                submitLabel={"Update"}
            />
        </Group>
        <Group>
            <ColorInput
                title={"End (1000)"}
                onSubmit={handleUpdateEnd}
                nameSource={end.name}
                hexSource={end.color}
                submitLabel={"Update"}
            />
        </Group>
        <Explain>Customize the name for the neutral scale and the order of the endpoints.</Explain>
        <Group>
            <Form onSubmit={handleSubmit}>
                <FormGroup className={"mb-2"}>
                    <FormLabel
                        htmlFor="neutral-scale-input-name">Scale Name</FormLabel>
                    <FormControl type="text"
                                 id="neutral-scale-input-name"
                                 value={neutralName}
                                 onChange={(event) => setNeutralName(event.currentTarget.value)}
                                 className={neutralName === "" ? "" : "alert-danger"}
                                 size={'sm'}
                    />
                </FormGroup>
                <Row className={"gx-2 align-items-end"}>
                    <Col>
                        <Button className={'w-100'}
                                disabled={neutralName === ""}
                                onClick={handleNeutralSubmit}
                                type={'primary'}
                        >
                            Update
                        </Button>
                    </Col>
                    <Col>
                        <Button className={' w-100'}
                                onClick={handleNeutralReset}
                                type={'secondary'}
                        >
                            Cancel
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type={'tertiary'}
                            onClick={handleSwapStartEnd}
                        >
                            <FontAwesomeIcon icon={'right-left'} /> Swap
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Group>
    </>);
};

export default TintAndShade
