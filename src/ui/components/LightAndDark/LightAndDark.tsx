import Explain from "@ui/components/helpers/Explain";
import {Button, Col, Form, FormControl, FormGroup, FormLabel, InputGroup, Row} from "react-bootstrap";
import Help from "@ui/components/helpers/Help";
import {getTooltipProps} from "@ui/constants/tooltips";
import React, {useState} from "react";
import {isValidColorName, isValidHexColor} from "@ui/helpers/colorMethods";
import InputGroupText from "react-bootstrap/InputGroupText";
import BrandColorChip from "@ui/components/BrandColors/BrandColorChip";
import useSwatchStore from "@ui/store/useSwatchStore";
import Chip from "@ui/components/SwatchesInput/Chip";
import FontAwesomeIcon from "@ui/components/helpers/FontAwesomeIcon";
import Group from "@ui/components/helpers/Group";

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


    const [darkName, setDarkName] = useState(dark.name);
    const [darkValue, setDarkValue] = useState(dark.color);
    const [lightName, setLightName] = useState(light.name);
    const [lightValue, setLightValue] = useState(light.color);
    const start = isDarkStart ? dark : light;
    const end = isDarkStart ? light : dark;
    const [neutralName, setNeutralName] = useState(neutral);


    const isFormValid = (name: string, color: string) => (isValidHexColor(color) && isValidColorName(name));
    const addStyle = 'btn btn-primary figma-bg-primary figma-text-light w-100 mx-auto';
    const addButtonStyle = (name: string, color: string) => `${addStyle} ${!isFormValid(name, color) ? "bg-dark" : ""}`;
    const addNeutralStyle = (name: string) => `${addStyle} ${name === "" ? "bg-dark" : ""}`;
    const handleColorSubmit =
        (name: string,
         value: string,
         updateColor: (color: string, name: string) => void,
         setName: (name: string) => void,
         setValue: (value: string) => void,
        ) => {
            const normalizedColorHex = (value as string).toUpperCase();


            updateColor(normalizedColorHex, name);
            buildSwatches();
            setName(name);
            setValue(normalizedColorHex);
        }

    const handleColorReset =
        (name: string,
         value: string,
         setName: (name: string) => void,
         setValue: (value: string) => void,
        ) => {
            setName(name);
            setValue(value);
        }
    const handleOrderSwap = () => {
        toggleIsDarkStart();
        buildSwatches();
    }

    const handleNeutralSubmit = () => {
        updateNeutral(neutralName);
        setNeutralName(neutralName)
    }

    const handleColorHexChange = (event: any, setValue: (value: string) => void) => {
        const newValue = event.currentTarget.value;
        // Allow hex characters (0-9, A-F) and limit to 6 characters max
        if (newValue.length <= 6 && /^[0-9A-Fa-f]*$/.test(newValue)) {
            setValue(newValue);
        }
    }

    // TODO: Refactor
    return (<>
        <Explain>Define the light and dark colors.</Explain>
        <Group>
            <Form>
                <FormGroup controlId="start-color-input-name" className={"mb-2"}>
                    <FormLabel
                        htmlFor="start-color-input-name">Dark Name<Help {...getTooltipProps('BRAND_COLOR_NAME')}
                                                                        className={"figma-ml-xs"} /></FormLabel>
                    <FormControl type="text"
                                 id="start-color-input-name"
                                 value={darkName}
                                 onChange={(event) => setDarkName(event.currentTarget.value)}
                                 className={darkName === "" ? "" : "alert-danger"}
                    />

                </FormGroup>
                <Row className={"gx-2 align-items-end"}>
                    <Col xs={5}>
                        <FormGroup controlId="brand-color-input-hex">
                            <FormLabel>Hex <Help {...getTooltipProps('BRAND_COLOR_HEX')}
                                                 className={"figma-ml-xs"} /></FormLabel>
                            <InputGroup>

                                <FormControl type="text"
                                             value={darkValue}
                                             onChange={(event) => handleColorHexChange(event, setDarkValue)}
                                             className={isValidHexColor(darkValue) ? "" : "invalid-form-value"}
                                />
                                <InputGroupText className={"p-0"}>
                                    <BrandColorChip color={darkValue} width={"1em"} />
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col xs={4}>
                        <Button className={addButtonStyle(darkName, darkValue)}
                                disabled={!isFormValid(darkName, darkValue)}
                                onClick={() => handleColorSubmit(darkName, darkValue, updateDark, setDarkName, setDarkValue)}>Update</Button>
                    </Col>
                    <Col xs={3}>
                        <Button className={addStyle}
                                onClick={() => handleColorReset(dark.name, dark.color, setDarkName, setDarkValue)}>Reset</Button>
                    </Col>
                </Row>
            </Form>
        </Group>
        <Group>
            <Form>
                <FormGroup controlId="light-color-input-name" className={"mb-2"}>
                    <FormLabel
                        htmlFor="light-color-input-name">Light Name<Help {...getTooltipProps('BRAND_COLOR_NAME')}
                                                                         className={"figma-ml-xs"} /></FormLabel>
                    <FormControl type="text"
                                 id="brand-color-input-name"
                                 value={lightName}
                                 onChange={(event) => setLightName(event.currentTarget.value)}
                                 className={lightName === "" ? "" : "alert-danger"}
                    />
                </FormGroup>
                <Row className={"gx-2 align-items-end"}>
                    <Col xs={5}>
                        <FormGroup controlId="brand-color-input-hex">
                            <FormLabel>Hex <Help {...getTooltipProps('BRAND_COLOR_HEX')}
                                                 className={"figma-ml-xs"} /></FormLabel>
                            <InputGroup>

                                <FormControl type="text"
                                             value={lightValue}
                                             onChange={(event) => handleColorHexChange(event, setLightValue)}
                                             className={isValidHexColor(lightValue) ? "" : "invalid-form-value"}
                                />
                                <InputGroupText className={"p-0"}>
                                    <BrandColorChip color={lightValue} />
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col xs={4}>
                        <Button className={addButtonStyle(lightName, lightValue)}
                                disabled={!isFormValid(lightName, lightValue)}
                                onClick={() => handleColorSubmit(lightName, lightValue, updateLight, setLightName, setLightValue)}>Update</Button>
                    </Col>
                    <Col xs={3}>
                        <Button className={addStyle}
                                onClick={() => handleColorReset(light.name, light.color, setLightName, setLightValue)}>Reset</Button>
                    </Col>
                </Row>
            </Form>
        </Group>

        <Group>
            <Form>
                <FormGroup controlId="neutral-scale-name-input-name" className={"mb-2"}>
                    <FormLabel
                        htmlFor="neutral-scale-input-name">Scale Name<Help {...getTooltipProps('NEUTRAL_SCALE_NAME')}
                                                                           className={"figma-ml-xs"} /></FormLabel>
                    <FormControl type="text"
                                 id="neutral-scale-input-name"
                                 value={neutralName}
                                 onChange={(event) => setNeutralName(event.currentTarget.value)}
                                 className={neutralName === "" ? "" : "alert-danger"}
                    />
                </FormGroup>
                <Row className={"column-gap-0 align-items-end"}>
                    <Col>
                        <Button className={addNeutralStyle(neutralName)}
                                disabled={neutralName === ""}
                                onClick={() => handleNeutralSubmit()}>Update</Button>
                    </Col>
                    <Col>
                        <Button className={addStyle}
                                onClick={() => setNeutralName(neutral)}>Reset</Button>
                    </Col>
                </Row>
            </Form>
            <div className={"w-100 d-flex justify-content-center align-items-center gap-2"}
                 onClick={handleOrderSwap}>
                <Chip color={start.color} width="2em" height="2em" />

                <Button className={"text-center"}>
                    <FontAwesomeIcon icon={'right-left'} /> Swap
                </Button>

                <Chip color={end.color} width="2em" height="2em" />
            </div>
        </Group>
    </>);
};

export default LightAndDark
