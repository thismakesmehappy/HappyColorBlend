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
    const dark = useSwatchStore((state) => state.dark);
    const updateDark = useSwatchStore((state) => state.setDark);
    const updateLight = useSwatchStore((state) => state.setLight);
    const light = useSwatchStore((state) => state.light);
    const isDarkStart = useSwatchStore((state) => state.isDarkStart);
    const toggleIsDarkStart = useSwatchStore((state) => state.toggleIsDarkStart);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    const neutral = useSwatchStore((state) => state.neutralScaleName);
    const updateNeutral = useSwatchStore((state) => state.setNeutralScaleName);


    const start = isDarkStart ? dark : light;
    const end = isDarkStart ? light : dark;
    const [neutralName, setNeutralName] = useState(neutral);

    const handleOrderSwap = () => {
        toggleIsDarkStart();
        buildSwatches();
    }

    const handleNeutralSubmit = () => {
        updateNeutral(neutralName);
        setNeutralName(neutralName)
    }

    const handleUpdateDark = (name: string, hex: string) => {
        const normalizedColorHex = hex.toUpperCase();
        updateDark(normalizedColorHex, name);
        buildSwatches();
    }

    const handleUpdateLight = (name: string, hex: string) => {
        const normalizedColorHex = hex.toUpperCase();
        updateLight(normalizedColorHex, name);
        buildSwatches();
    }

    return (<>
        <Explain>Define the light and dark colors.</Explain>
        <Group>
            <ColorInput
                title={"Dark"}
                onSubmit={handleUpdateDark}
                nameSource={dark.name}
                hexSource={dark.color}
                submitLabel={"Update"}
            />
        </Group>
        <Group>
            <ColorInput
                title={"Light"}
                onSubmit={handleUpdateLight}
                nameSource={light.name}
                hexSource={light.color}
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
