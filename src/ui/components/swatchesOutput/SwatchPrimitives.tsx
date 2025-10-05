import useSwatchStore from "@ui/store/useSwatchStore";
import SwatchColorChip from "@ui/components/swatchesOutput/SwatchColorChip";
import React from "react";
import Swatch from "@ui/components/swatchesInput";
import useTokenNameStore from "@ui/store/useTokenNameStore";
import {computeTokenName} from "@ui/helpers/computeTokenName";
import {Col, Row} from "react-bootstrap";

const SwatchPrimitives = () => {
    const light = useSwatchStore(state => state.light);
    const dark = useSwatchStore(state => state.dark);
    const primary = useSwatchStore(state => state.primaryColors);
    const caseTreatment = useTokenNameStore(state => state.caseTreatment)
    const spaceTreatment = useTokenNameStore(state => state.spaceTreatment)
    const leadingCharsCount = useTokenNameStore(state => state.leadingCharsCount)
    const separatorCharsCount = useTokenNameStore(state => state.separatorCharsCount)
    const leadingCharType = useTokenNameStore(state => state.leadingCharType)
    const separatorCharType = useTokenNameStore(state => state.separatorCharType)
    const appendSeparatorToPrimitives = useTokenNameStore(state => state.appendSeparatorToPrimitive)
    const scaleEndColorToken = computeTokenName(
        light.name,
        caseTreatment,
        spaceTreatment,
        leadingCharsCount,
        separatorCharsCount,
        leadingCharType,
        separatorCharType,
        appendSeparatorToPrimitives
    );

    const scaleStartColorToken = computeTokenName(
        dark.name,
        caseTreatment,
        spaceTreatment,
        leadingCharsCount,
        separatorCharsCount,
        leadingCharType,
        separatorCharType,
        appendSeparatorToPrimitives
    );

    return (<Row xs={4} className={"gx-0 figma-mb-lg fixed-cols-4"}>
        <Col>
            <Swatch color={light.color} name={scaleStartColorToken} displayOnly={true} />
        </Col>
        <Col>
            <Swatch color={dark.color} name={scaleEndColorToken} displayOnly={true} />
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
