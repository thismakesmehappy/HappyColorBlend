import useSwatchStore from "@ui/store/useSwatchStore";
import {Col, Row} from "react-bootstrap";
import BrandColorDisplay from "@ui/components/BrandColors/BrandColorDisplay";
import React from "react";
import Group from "@ui/components/helpers/Group";

const BrandColorsPreview = () => {
    const brandColors = useSwatchStore(state => state.primaryColors);


    return (
        <Group>
            <Row xs={1} className={"mt-2"}>
                {
                    brandColors.map(color => {
                        return (
                            <Col key={color.id}>
                                <BrandColorDisplay color={color.color} name={color.name} id={color.id} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Group>
    );
};

export default BrandColorsPreview
