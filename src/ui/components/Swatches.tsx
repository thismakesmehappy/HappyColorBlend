import React from 'react';
import '../scss/column-layout.scss';
import Section from "./Section";
import useSwatchStore from "../store/useSwatchStore";
import SwatchGroupSwatches from "./Swatches/SwatchGroupSwatches";


interface SwatchesProps {
    className?: string;
    style?: React.CSSProperties;
}

const Swatches: React.FC<SwatchesProps> = ({className, style}) => {
    const swatches = useSwatchStore((state) => state.getSwatches());
    return (
        <Section
            id="swatches"
            className={className}
            style={style}
        >
            {swatches.map((primaryColor) =>
                <SwatchGroupSwatches color={primaryColor.base.color} colorName={primaryColor.base.name}
                                     swatches={primaryColor.swatches} />
            )}
        </Section>
    );
};

export default Swatches;