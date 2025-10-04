import useSwatchStore from "@ui/store/useSwatchStore";
import {Col, Row} from "react-bootstrap";
import BrandColorDisplay from "@ui/components/BrandColors/BrandColorDisplay";
import React from "react";

const BrandColorsPreview = () => {
    const brandColors = useSwatchStore(state => state.primaryColors);


    return (<Row xs={1}>
        {
            brandColors.map(color => {
                return (
                    <Col>
                        <BrandColorDisplay color={color.color} name={color.name} id={color.id} />
                    </Col>
                )
            })
        }
    </Row>);
};

export default BrandColorsPreview
