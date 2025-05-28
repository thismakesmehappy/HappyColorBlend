import React from 'react';
import '../scss/column-layout.scss';
import Section from "./Section";
import Swatch from "./swatch/Swatch";
import testSwatches from "../../constants/testSwatches";
import useSwatchStore, {SwatchStoreInputSwatch} from "../store/useSwatchStore";

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
            {swatches.map((base) => {
                    return <>
                        <p className={"figma-subtitle"}>{base.base.name} {base.base.color}</p>
                        <div className={"row"}>
                            {base.swatches.map((swatch) => {
                                return <Swatch name={String(swatch.step)} color={String(swatch.color)} horizontal={true}
                                               display={true}
                                               className={"col col-3"}
                                               updateSwatch={function (color: string, name: string, id?: string): void {

                                               }} />
                            })}
                        </div>
                    </>
                }
            )}
        </Section>
    );
};

export default Swatches;