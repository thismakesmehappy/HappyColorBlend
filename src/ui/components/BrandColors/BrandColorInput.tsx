import React, {useState} from "react";
import {Button, Col, Form, FormControl, FormGroup, FormLabel, InputGroup, Row} from "react-bootstrap";
import BrandColorChip from "@ui/components/BrandColors/BrandColorChip";
import {isValidColorName, isValidHexColor} from "@ui/helpers/colorMethods";
import useSwatchStore, {SwatchStoreInputSwatch} from "@ui/store/useSwatchStore";
import {v4 as uuidv4} from "uuid";
import InputGroupText from "react-bootstrap/InputGroupText";
import Help from "@ui/components/helpers/Help";
import {getTooltipProps} from "@ui/constants/tooltips";

const BrandColorInput = () => {
    const addPrimaryColor = useSwatchStore((state) => state.addPrimaryColor);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);


    const [colorHex, setColorHex] = useState<string>("");
    const [colorName, setColorName] = useState<string>("");
    const isFormValid = (isValidHexColor(colorHex) && isValidColorName(colorName));

    const handleColorNameChange = (event: any) => {
        setColorName(event.currentTarget.value);
    }
    const handleColorHexChange = (event: any) => {
        const newValue = event.currentTarget.value;
        // Allow hex characters (0-9, A-F) and limit to 6 characters max
        if (newValue.length <= 6 && /^[0-9A-Fa-f]*$/.test(newValue)) {
            setColorHex(newValue);
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && isFormValid) {
            event.preventDefault();
            handleColorSubmit();
        }
    }

    const handleColorSubmit = () => {
        const newBrandColor: SwatchStoreInputSwatch = {
            color: (colorHex as string).toUpperCase(),
            name: colorName as string,
            id: uuidv4(),
        };
        addPrimaryColor(newBrandColor);
        buildSwatches();
        setColorHex("");
        setColorName("");
    }
    const addButtonStyle = `btn btn-primary figma-bg-primary figma-text-light w-100 mx-auto ${!isFormValid ? "bg-dark" : ""}`;

    return (
        <div>
            <Form>
                <FormGroup controlId="brand-color-input-name" className={"mb-2"}>
                    <FormLabel htmlFor="brand-color-input-name">Name<Help {...getTooltipProps('BRAND_COLOR_NAME')}
                                                                          className={"figma-ml-xs"} /></FormLabel>
                    <FormControl type="text"
                                 id="brand-color-input-name"
                                 value={colorName}
                                 onChange={(event) => handleColorNameChange(event)}
                                 onKeyDown={handleKeyDown}
                                 className={colorName === "" ? "" : "alert-danger"}
                    />
                </FormGroup>
                <Row className={"column-gap-0 align-items-end"}>
                    <Col xs={7}>
                        <FormGroup controlId="brand-color-input-hex">
                            <FormLabel>Hex <Help {...getTooltipProps('BRAND_COLOR_HEX')}
                                                 className={"figma-ml-xs"} /></FormLabel>
                            <InputGroup>

                                <FormControl type="text"
                                             value={colorHex}
                                             onChange={(event) => handleColorHexChange(event)}
                                             onKeyDown={handleKeyDown}
                                             className={isValidHexColor(colorHex) ? "" : "invalid-form-value"}
                                />
                                <InputGroupText className={"p-0"}>
                                    <BrandColorChip color={colorHex} />
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
    );
};

export default BrandColorInput;
