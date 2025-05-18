import React from 'react';
import '../scss/column-layout.scss';
import Section from "./Section";

interface SwatchesProps {
    className?: string;
    style?: React.CSSProperties;
}

const Swatches: React.FC<SwatchesProps> = ({className, style}) => {
    return (
        <Section
            id="swatches"
            className={className}
            style={style}
        >
            {/* Swatches content */}
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