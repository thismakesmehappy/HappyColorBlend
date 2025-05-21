import React from 'react';
import '../scss/column-layout.scss';
import Section from "./Section";
import Swatch from "./swatch/Swatch";

interface BasesProps {
    className?: string;
    style?: React.CSSProperties;
}

const Bases: React.FC<BasesProps> = ({className, style}) => {
    return (
        <Section
            id="bases"
            className={className}
            style={style}
        >
            <div>
                {/* Bases content */}
                <Swatch color='00ffff' name={'Pepper'} canDelete={true} />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases<br />
                bases
            </div>
        </Section>
    );
};

export default Bases;