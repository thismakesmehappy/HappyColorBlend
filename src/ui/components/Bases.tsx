import React from 'react';
import '../scss/column-layout.scss';
import Section from "./Section";
import Swatch from "./swatch/Swatch";
import useSwatchStore, {SwatchStoreInputSwatch} from "../store/useSwatchStore";
import FontAwesomeIcon from "./helpers/FontAwesomeIcon";
import {v4 as uuidv4} from 'uuid';
import ColorNamer from 'color-namer';

interface BasesProps {
    className?: string;
    style?: React.CSSProperties;
}

const Bases: React.FC<BasesProps> = ({className, style}) => {
    const bases = useSwatchStore((state) => state.bases);
    const updateBase = useSwatchStore((state) => state.updateBase);
    const addBase = useSwatchStore((state) => state.addBase);
    const removeBase = useSwatchStore((state) => state.removeBase);
    const createRandomBase = () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const randomName = ColorNamer(`#${randomColor}`).ntc[0].name;
        const newBase: SwatchStoreInputSwatch = {
            color: randomColor,
            name: randomName,
            id: uuidv4()
        };
        addBase(newBase);
    };
    return (
        <Section
            id="bases"
            className={className}
            style={style}
        >
            <p className={"figma-subtitle"}>Bases</p>
            <div onClick={createRandomBase}>
                <FontAwesomeIcon icon={"circle-plus"} className={"figma-icon figma-text-primary fa-2x"} />
            </div>
            <div className={"row"}>
                {/* Bases content */}
                {bases.map((base: SwatchStoreInputSwatch) => (
                    <Swatch name={String(base.name)} color={String(base.color)}
                            className={"col col-6 mb-4"} canDelete={true}
                            updateSwatch={function (color: string, name: string, id?: string): void {
                                updateBase(id!, color, name);
                                console.log("updated " + id)
                            }}
                            onDelete={removeBase}
                            id={base.id} />
                ))
                }
            </div>
        </Section>
    );
};

export default Bases;
