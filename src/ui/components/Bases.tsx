import React from 'react';
import '../scss/column-layout.scss';
import Section from "./Section";
import Swatch from "./swatch/Swatch";
import useSwatchStore, {SwatchStoreInputSwatch} from "../store/useSwatchStore";

interface BasesProps {
    className?: string;
    style?: React.CSSProperties;
}

const Bases: React.FC<BasesProps> = ({className, style}) => {
    const bases = useSwatchStore((state) => state.bases);
    const updateBase = useSwatchStore((state) => state.updateBase);
    return (
        <Section
            id="bases"
            className={className}
            style={style}
        >
            <p className={"figma-subtitle"}>Bases</p>
            <div className={"row"}>
                {/* Bases content */}
                {bases.map((base: SwatchStoreInputSwatch) => (
                    <Swatch name={String(base.name)} color={String(base.color)}
                            className={"col col-6 mb-4"} canDelete={true}
                            updateSwatch={function (color: string, name: string, id?: string): void {
                                updateBase(id!, color, name);
                                console.log("updated " + id)
                            }}
                            id={base.id} />
                ))
                }
            </div>
        </Section>
    );
};

export default Bases;