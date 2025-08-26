import useSwatchStore from "@ui/store/useSwatchStore";
import SwatchColorChip from "@ui/components/swatchesOutput/SwatchColorChip";
import React from "react";
import Swatch from "@ui/components/swatchesInput";
import useTokenNameStore from "@ui/store/useTokenNameStore";
import {computeTokenName} from "@ui/helpers/computeTokenName";
import {Col, Row} from "react-bootstrap";

const SwatchPrimitives = () => {
    const scaleEnd = useSwatchStore(state => state.scaleEnd);
    const scaleStart = useSwatchStore(state => state.scaleStart);
    const primary = useSwatchStore(state => state.primaryColors);
    const caseTreatment = useTokenNameStore(state => state.caseTreatment)
    const spaceTreatment = useTokenNameStore(state => state.spaceTreatment)
    const leadingCharsCount = useTokenNameStore(state => state.leadingCharsCount)
    const separatorCharsCount = useTokenNameStore(state => state.separatorCharsCount)
    const leadingCharType = useTokenNameStore(state => state.leadingCharType)
    const separatorCharType = useTokenNameStore(state => state.separatorCharType)
    const appendSeparatorToPrimitives = useTokenNameStore(state => state.appendSeparatorToPrimitive)
    const scaleEndColorToken = computeTokenName(
        scaleEnd.name,
        caseTreatment,
        spaceTreatment,
        leadingCharsCount,
        separatorCharsCount,
        leadingCharType,
        separatorCharType,
        appendSeparatorToPrimitives
    );

    const scaleStartColorToken = computeTokenName(
        scaleStart.name,
        caseTreatment,
        spaceTreatment,
        leadingCharsCount,
        separatorCharsCount,
        leadingCharType,
        separatorCharType,
        appendSeparatorToPrimitives
    );

    return (<Row xs={5} className={"gx-0 figma-mb-lg"}>
        <Col>
            <Swatch color={scaleStart.color} name={scaleStartColorToken} displayOnly={true} />
        </Col>
        <Col>
            <Swatch color={scaleEnd.color} name={scaleEndColorToken} displayOnly={true} />
        </Col>
        {primary.map((color) => {
            const colorTokenName = computeTokenName(
                color.name,
                caseTreatment,
                spaceTreatment,
                leadingCharsCount,
                separatorCharsCount,
                leadingCharType,
                separatorCharType,
                appendSeparatorToPrimitives
            );
            return (
                <Col>
                    <Swatch color={color.color} name={colorTokenName} displayOnly={true}
                            key={`${color.color}-${color.name}`} />
                </Col>)
        })}
    </Row>);
};

export default SwatchPrimitives
