import Explain from "@ui/components/helpers/Explain";
import {Button, Col, Form, FormControl, FormGroup, FormLabel, InputGroup, Row} from "react-bootstrap";
import Help from "@ui/components/helpers/Help";
import {getTooltipProps} from "@ui/constants/tooltips";
import React, {useState} from "react";
import {isValidHexColor} from "@ui/helpers/colorMethods";
import InputGroupText from "react-bootstrap/InputGroupText";
import BrandColorChip from "@ui/components/BrandColors/BrandColorChip";
import useSwatchStore from "@ui/store/useSwatchStore";

const LightAndDark = () => {
    const [darkName, setDarkName] = useState("");
    const [darkValue, setDarkValue] = useState("");
    const [lightName, setLightName] = useState("");
    const [lightValue, lightDarkValue] = useState("");

    const addPrimaryColor = useSwatchStore((state) => state.getScaleStart());


    return (<>
        <Explain>Define the light (tint) and dark (shade) values, names, and order.</Explain>
        <div>
            <Form>
                <FormGroup controlId="brand-color-input-name" className={"mb-2"}>
                    <FormLabel htmlFor="brand-color-input-name">Light Name<Help {...getTooltipProps('BRAND_COLOR_NAME')}
                                                                                className={"figma-ml-xs"} /></FormLabel>
                    <FormControl type="text"
                                 id="brand-color-input-name"
                                 value={darkName}
                                 onChange={(event) => handleColorNameChange(event)}
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
                                             value={lightValue}
                                             onChange={(event) => handleColorHexChange(event)}
                                             className={isValidHexColor(lightValue) ? "" : "invalid-form-value"}
                                />
                                <InputGroupText className={"p-0"}>
                                    <BrandColorChip color={lightValue} />
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>


                    </Col>
                    <Col>
                        <Button className={addButtonStyle}
                                disabled={!isFormValid}
                                onClick={handleColorSubmit}>Add</Button>
                    </Col>
                </Row>
            </Form>

        </div>
    </>);
};

export default LightAndDark
