import React from 'react';
import '../scss/column-layout.scss';
import Section from "./Section";
import Swatch from "./swatch/Swatch";
import testSwatches from "../../constants/testSwatches";

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
            <p className={"figma-subtitle"}>Bases</p>
            <div className={"row"}>
                {/* Bases content */}
                {testSwatches.map(({name, hex}, index) => (
                    <Swatch name={String(name)} color={String(hex)}
                            className={"col col-6 mb-4"} canDelete={true}
                            updateSwatch={function (color: string, name: string, id?: string): void {
                                
                            }} />
                ))
                }
            </div>
        </Section>
    );
};

export default Bases;