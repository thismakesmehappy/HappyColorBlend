import Explain from "@ui/components/helpers/Explain";
import {Col, Form, FormControl, FormGroup, FormLabel, InputGroup, Row} from "react-bootstrap";
import Help from "@ui/components/helpers/Help";
import {getTooltipProps} from "@ui/constants/tooltips";
import React, {useState} from "react";
import useSwatchStore from "@ui/store/useSwatchStore";
import Chip from "@ui/components/SwatchesInput/Chip";
import FontAwesomeIcon from "@ui/components/helpers/FontAwesomeIcon";
import Group from "@ui/components/helpers/Group";
import Button from "@ui/components/helpers/Button";
import ColorInput from "@ui/components/helpers/ColorInput";

const LightAndDark = () => {
    const start = useSwatchStore((state) => state.scaleStart);
    const updateStart = useSwatchStore((state) => state.setScaleStart);
    const end = useSwatchStore((state) => state.scaleEnd);
    const updateEnd = useSwatchStore((state) => state.setScaleEnd);
    const swapStartEnd = useSwatchStore((state) => state.swapScaleEndpoints);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    const neutral = useSwatchStore((state) => state.neutralScaleName);
    const updateNeutral = useSwatchStore((state) => state.setNeutralScaleName);


    const [neutralName, setNeutralName] = useState(neutral);

    const handleOrderSwap = () => {
        swapStartEnd();
        buildSwatches();
    }

    const handleNeutralSubmit = () => {
        updateNeutral(neutralName);
        setNeutralName(neutralName)
    }

    const handleUpdateDark = (name: string, hex: string) => {
        const normalizedColorHex = hex.toUpperCase();
        updateStart(normalizedColorHex, name);
        buildSwatches();
    }

    const handleUpdateLight = (name: string, hex: string) => {
        const normalizedColorHex = hex.toUpperCase();
        updateEnd(normalizedColorHex, name);
        buildSwatches();
    }

    return (<>
        <Explain>Define the light and dark colors.</Explain>
        <Group>
            <ColorInput
                title={"Dark"}
                onSubmit={handleUpdateDark}
                nameSource={start.name}
                hexSource={start.color}
                submitLabel={"Update"}
            />
        </Group>
        <Group>
            <ColorInput
                title={"Light"}
                onSubmit={handleUpdateLight}
                nameSource={end.name}
                hexSource={end.color}
                submitLabel={"Update"}
            />
        </Group>

        <Group>
            <Form>
                <FormGroup className={"mb-2"}>
                    <FormLabel
                        htmlFor="neutral-scale-input-name">Scale Name<Help {...getTooltipProps('NEUTRAL_SCALE_NAME')}
                                                                           className={"figma-ml-xs"} /></FormLabel>
                    <FormControl type="text"
                                 id="neutral-scale-input-name"
                                 value={neutralName}
                                 onChange={(event) => setNeutralName(event.currentTarget.value)}
                                 className={neutralName === "" ? "" : "alert-danger"}
                                 size={'sm'}
                    />
                </FormGroup>
                <Row className={"column-gap-0 align-items-end"}>
                    <Col>
                        <Button className={'w-100'}
                                disabled={neutralName === ""}
                                onClick={() => handleNeutralSubmit()}
                                type={'primary'}
                        >
                            Update
                        </Button>
                    </Col>
                    <Col>
                        <Button className={' w-100'}
                                onClick={() => setNeutralName(neutral)}
                                type={'secondary'}
                        >
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Form>
            <div className={"w-100 d-flex justify-content-center align-items-center gap-2"}
                 onClick={handleOrderSwap}>
                <Chip color={start.color} width="2em" height="2em" />

                <Button
                    type={'primary'}
                >
                    <FontAwesomeIcon icon={'right-left'} /> Swap
                </Button>

                <Chip color={end.color} width="2em" height="2em" />
            </div>
        </Group>
    </>);
};

export default LightAndDark
