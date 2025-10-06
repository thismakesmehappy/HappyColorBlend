import Explain from "@ui/components/helpers/Explain";
import {Button, Col, Form, FormControl, FormGroup, FormLabel, InputGroup, Row} from "react-bootstrap";
import Help from "@ui/components/helpers/Help";
import {getTooltipProps} from "@ui/constants/tooltips";
import React, {useState} from "react";
import {isValidColorName, isValidHexColor} from "@ui/helpers/colorMethods";
import InputGroupText from "react-bootstrap/InputGroupText";
import BrandColorChip from "@ui/components/BrandColors/BrandColorChip";
import useSwatchStore, {buildNewSwatches, SwatchStoreInputSwatch} from "@ui/store/useSwatchStore";
import Chip from "@ui/components/swatchesInput/Chip";
import FontAwesomeIcon from "@ui/components/helpers/FontAwesomeIcon";

const LightAndDark = () => {
    const dark = useSwatchStore((state) => state.dark);
    const updateDark = useSwatchStore((state) => state.setDark);
    const updateLight = useSwatchStore((state) => state.setLight);
    const light = useSwatchStore((state) => state.light);
    const isDarkStart = useSwatchStore((state) => state.isDarkStart);
    const toggleIsDarkStart = useSwatchStore((state) => state.toggleIsDarkStart);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);

    const [darkName, setDarkName] = useState(dark.name);
    const [darkValue, setDarkValue] = useState(dark.color);
    const [lightName, setLightName] = useState(light.name);
    const [lightValue, setLightValue] = useState(light.color);
    const start = isDarkStart ? dark : light;
    const end = isDarkStart ? light : dark;


    const isFormValid = (name: string, color: string) => (isValidHexColor(color) && isValidColorName(name));
    const addButtonStyle = (name: string, color: string) => `btn btn-primary figma-bg-primary figma-text-light w-100 mx-auto ${!isFormValid(name, color) ? "bg-dark" : ""}`;
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
    const handleOrderSwap = () => {
        toggleIsDarkStart();
        buildSwatches();
    }

    const handleColorHexChange = (event: any, setValue: (value: string) => void) => {
        const newValue = event.currentTarget.value;
        // Allow hex characters (0-9, A-F) and limit to 6 characters max
        if (newValue.length <= 6 && /^[0-9A-Fa-f]*$/.test(newValue)) {
            setValue(newValue);
        }
    }

    return (<>
        <Explain>Define the light (tint) and dark (shade) values, names, and order.</Explain>
        <div>
            <Form>
                <FormGroup controlId="dark-color-input-name" className={"mb-2"}>
                    <FormLabel htmlFor="dark-color-input-name">Dark Name<Help {...getTooltipProps('BRAND_COLOR_NAME')}
                                                                              className={"figma-ml-xs"} /></FormLabel>
                    <FormControl type="text"
                                 id="brand-color-input-name"
                                 value={darkName}
                                 onChange={(event) => setDarkName(event.currentTarget.value)}
                                 className={darkName === "" ? "" : "alert-danger"}
                    />
                </FormGroup>
                <Row className={"column-gap-0 align-items-end"}>
                    <Col xs={7}>
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
                                    <BrandColorChip color={darkValue} />
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>


                    </Col>
                    <Col>
                        <Button className={addButtonStyle(darkName, darkValue)}
                                disabled={!isFormValid(darkName, darkValue)}
                                onClick={() => handleColorSubmit(darkName, darkValue, updateDark, setDarkName, setDarkValue)}>Add</Button>
                    </Col>
                </Row>
            </Form>

        </div>
        <div>
            <Form>
                <FormGroup controlId="light-color-input-name" className={"mb-2"}>
                    <FormLabel htmlFor="light-color-input-name">Light Name<Help {...getTooltipProps('BRAND_COLOR_NAME')}
                                                                                className={"figma-ml-xs"} /></FormLabel>
                    <FormControl type="text"
                                 id="brand-color-input-name"
                                 value={lightName}
                                 onChange={(event) => setLightName(event.currentTarget.value)}
                                 className={lightName === "" ? "" : "alert-danger"}
                    />
                </FormGroup>
                <Row className={"column-gap-0 align-items-end"}>
                    <Col xs={7}>
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
                    <Col>
                        <Button className={addButtonStyle(lightName, lightValue)}
                                disabled={!isFormValid(lightName, lightValue)}
                                onClick={() => handleColorSubmit(lightName, lightValue, updateLight, setLightName, setLightValue)}>Add</Button>
                    </Col>
                </Row>
            </Form>

        </div>
        <div>
            <p>Order</p>
            <div className={"w-100 d-flex justify-content-center align-items-center gap-2"} onClick={handleOrderSwap}>
                <Chip color={start.color} width="3em" height="3em" />

                <Button className={"text-center"}>
                    <FontAwesomeIcon icon={'right-left'} /> Swap
                </Button>

                <Chip color={end.color} width="3em" height="3em" />
            </div>

        </div>
    </>);
};

export default LightAndDark
