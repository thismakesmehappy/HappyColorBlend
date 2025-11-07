import {Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Button from "@ui/components/helpers/Button";
import BrandColorChip from "@ui/components/BrandColors/BrandColorChip";
import {isValidColorName, isValidHexColor} from "@ui/helpers/colorMethods";
import ColorNamer from 'color-namer';

interface ColorInputInterface {
    title?: string;
    nameSource?: string;
    hexSource?: string;
    shouldCancel?: boolean;
    onSubmit: (name: string, hex: string) => void;
    submitLabel?: string;
}


const ColorInput = ({
                        onSubmit,
                        title,
                        nameSource = "",
                        hexSource = "",
                        shouldCancel = true,
                        submitLabel = "Submit"
                    }: ColorInputInterface) => {
    const [name, setName] = useState<string>(nameSource);
    const [hex, setHex] = useState<string>(hexSource);

    useEffect(() => {
            setName(nameSource);
            setHex(hexSource);
        }
        , [nameSource, hexSource])

    // Add validation like WorkingColorInput
    const isFormValid = isValidHexColor(hex) && isValidColorName(name);

    const handleNameChange = (event: any) => {
        setName(event.currentTarget.value);
    }

    const handleHexChange = (event: any) => {
        const newValue = event.currentTarget.value;
        if (newValue.length <= 6 && /^[0-9A-Fa-f]*$/.test(newValue)) {
            setHex(newValue);
        }
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    const handleUpdate = () => {
        if (isFormValid) {
            onSubmit(name, hex);
            setName(nameSource);
            setHex(hexSource);
        }
    }

    const handleNameColor = () => {
        if (isValidHexColor(hex)) {
            const colorName = ColorNamer(`#${hex}`).ntc[0].name;
            // Filter to only alphabetic characters and spaces
            const cleanName = colorName.replace(/[^a-zA-Z\s]/g, '').trim();
            setName(cleanName);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && isFormValid) {
            event.preventDefault();
            handleUpdate();
        } else if (event.key === 'Escape') {
            event.preventDefault();
            handleCancel();
        }
    };

    const handleCancel = () => {
        setName(nameSource);
        setHex(hexSource);
    };

    return (
        <div className={"color-input"}>
            {title && <p>{title}</p>}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Row className={"gx-2 mb-2"}>
                        <Col xs={"3"}>Hex</Col>
                        <Col xs={"4"}>
                            <FormControl type={"text"}
                                         size={'sm'}
                                         value={hex}
                                         onChange={handleHexChange}
                                         onKeyDown={handleKeyDown}
                                         className={!isValidHexColor(hex) ? 'invalid' : ''}
                            />
                        </Col>
                        <Col xs={"5"}>
                            <Button
                                type={"tertiary"}
                                className={"w-100"}
                                disabled={!isValidHexColor(hex)}
                                onClick={handleNameColor}
                            >
                                Name it
                            </Button>

                        </Col>
                    </Row>
                    <Row className={"gx-2 mb-2"}>
                        <Col xs={"3"}>Name</Col>
                        <Col xs={"9"}>
                            <FormControl type={"text"}
                                         size={'sm'}
                                         value={name}
                                         onChange={handleNameChange}
                                         onKeyDown={handleKeyDown}
                                         className={!isValidColorName(name) ? 'invalid' : ''}
                            />
                        </Col>
                    </Row>
                    <Row className={"gx-2"}>
                        <Col xs={2}>
                            <BrandColorChip color={hex} />
                        </Col>
                        <Col>
                            <Button
                                type={"primary"}
                                className={"w-100"}
                                disabled={!isFormValid}
                                onClick={handleUpdate}
                            >
                                {submitLabel}
                            </Button>
                        </Col>
                        {shouldCancel &&
                            <Col>
                                <Button
                                    type={"secondary"}
                                    className={"w-100"}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                            </Col>
                        }
                    </Row>
                </FormGroup>
            </Form>
        </div>
    );
};

export default ColorInput
