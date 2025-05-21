import React from 'react';
import '../scss/column-layout.scss';
import Section from "./Section";
import Swatch from "./swatch/Swatch";

interface SwatchesProps {
    className?: string;
    style?: React.CSSProperties;
}

const swatches = ['ff9483', '9304fb', 'abef73']

const Swatches: React.FC<SwatchesProps> = ({className, style}) => {
    return (
        <Section
            id="swatches"
            className={className}
            style={style}
        >
            {/* Swatches content */}
            {swatches.map((swatch, index) => (
                <Swatch name={String(index)} color={swatch} horizontal={true} display={true} />
            ))
            }
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches<br />
            swatches
        </Section>
    );
};

export default Swatches;