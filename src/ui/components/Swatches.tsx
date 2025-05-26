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
    // Get data from store
    const bases = useSwatchStore((state) => state.getBases());
    const dark = useSwatchStore((state) => state.getDark());
    const light = useSwatchStore((state) => state.getLight());

    // Get update functions from store
    const setDark = useSwatchStore((state) => state.setDark);
    const setLight = useSwatchStore((state) => state.setLight);
    const updateBase = useSwatchStore((state) => state.updateBase);

    // Update functions for different swatch types
    const updateDarkSwatch = (color: string, name: string) => {
        setDark({color, name, id: "dark"});
    };

    const updateLightSwatch = (color: string, name: string) => {
        setLight({color, name, id: "light"});
    };

    const updateBaseSwatch = (color: string, name: string, id?: string) => {
        if (id) {
            updateBase(id, color, name);
        }
    };
    return (
        <Section
            id="swatches"
            className={className}
            style={style}
        >
            <div className={"row"}>
                <Swatch
                    name={String(dark.name)}
                    color={String(dark.color)}
                    updateSwatch={updateDarkSwatch}
                    className={"col col-2"}
                />
                <Swatch
                    name={String(light.name)}
                    color={String(light.color)}
                    updateSwatch={updateLightSwatch}
                    className={"col col-2"}
                />
                {bases.map((base: SwatchStoreInputSwatch) => (
                    <Swatch name={String(base.name)} color={String(base.color)}
                            className={"col col-2 mb-4"} canDelete={true}
                            updateSwatch={function (color: string, name: string, id?: string): void {

                            }}
                            id={base.id} />
                ))}
            </div>
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