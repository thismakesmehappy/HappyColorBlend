import React from 'react';
import '../scss/column-layout.scss';
import Section from "./Section";
import Swatch from "./swatch/Swatch";
import testSwatches from "../../constants/testSwatches";

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
            <p className={"figma-subtitle"}>A Color</p>
            <div className={"row"}>
                {/* Swatches content */}
                {testSwatches.map(({name, hex}, index) => (
                    <Swatch name={String(name)} color={String(hex)} horizontal={true} display={true}
                            className={"col col-3 figma-pb-sm"}
                            updateSwatch={function (color: string, name: string, id?: string): void {

                            }} />
                ))
                }
            </div>
            <div className={"separator-xl"}></div>
            <p className={"figma-subtitle"}>Another Color</p>
            <div className={"row"}>
                {/* Swatches content */}
                {testSwatches.map(({name, hex}, index) => (
                    <Swatch name={String(name)} color={String(hex)} horizontal={true} display={true}
                            className={"col col-3"}
                            updateSwatch={function (color: string, name: string, id?: string): void {
                                
                            }} />
                ))
                }
            </div>
        </Section>
    );
};

export default Swatches;