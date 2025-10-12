import useSwatchStore from "@ui/store/useSwatchStore";
import React from "react";
import useTokenNameStore from "@ui/store/useTokenNameStore";
import {computeTokenName} from "@ui/helpers/computeTokenName";
import {Col, Row} from "react-bootstrap";
import Swatch from "@ui/components/SwatchesInput/Swatch";

const SwatchPrimitives = () => {
    const start = useSwatchStore(state => state.scaleStart);
    const end = useSwatchStore(state => state.scaleEnd);
    const primary = useSwatchStore(state => state.primaryColors);
    const caseTreatment = useTokenNameStore(state => state.caseTreatment)
    const spaceTreatment = useTokenNameStore(state => state.spaceTreatment)
    const leadingCharsCount = useTokenNameStore(state => state.leadingCharsCount)
    const separatorCharsCount = useTokenNameStore(state => state.separatorCharsCount)
    const leadingCharType = useTokenNameStore(state => state.leadingCharType)
    const separatorCharType = useTokenNameStore(state => state.separatorCharType)
    const appendSeparatorToPrimitives = useTokenNameStore(state => state.appendSeparatorToPrimitive)

    const startColorToken = computeTokenName(
        start.name,
        caseTreatment,
        spaceTreatment,
        leadingCharsCount,
        separatorCharsCount,
        leadingCharType,
        separatorCharType,
        appendSeparatorToPrimitives
    );

    const endColorToken = computeTokenName(
        end.name,
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
            <Swatch color={start.color} name={startColorToken} displayOnly={true} />
        </Col>
        <Col>
            <Swatch color={end.color} name={endColorToken} displayOnly={true} />
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
