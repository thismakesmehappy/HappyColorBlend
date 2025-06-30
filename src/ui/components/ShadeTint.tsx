import React, {forwardRef, useEffect, useState} from 'react';
import Swatch from "./swatchesInput/Swatch";
import useSwatchStore from "../store/useSwatchStore";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import RampNameEditor from "@ui/components/shadeTint/RampNameEditor";
import FontAwesomeIcon from "./helpers/FontAwesomeIcon";
import TooltipWrapper from './helpers/TooltipWrapper';
import Help from "@ui/components/helpers/Help";

interface ShadeTintProps extends ClassAndStyle {
}

const ShadeTint = forwardRef<HTMLDivElement, ShadeTintProps>(
    ({className, style}, ref) => {
        const shade = useSwatchStore(state => state.getShade());
        const tint = useSwatchStore(state => state.getTint());
        const setShade = useSwatchStore(state => state.setShade);
        const setTint = useSwatchStore(state => state.setTint);
        const buildSwatches = useSwatchStore((state) => state.buildSwatches);
        const [shadeName, setShadeName] = useState(shade.name);
        const [shadeColor, setShadeColor] = useState(shade.color);
        const [tintName, setTintName] = useState(tint.name);
        const [tintColor, setTintColor] = useState(tint.color);

        useEffect(() => {
            setShadeName(shade.name);
            setShadeColor(shade.color);
            setTintName(tint.name);
            setTintColor(tint.color);
        }, [shade, tint]);

        return (
            <div className={className} style={style} data-testid={"shade-tint"} ref={ref}>
                {/* Shade-tint content */}
                {/* <div className={"row"}> */}
                <div className={"row"}>
                    {/* <div className={"col col-6"}> */}
                    <div className={"col col-6"}>
                        <p className={"figma-subtitle"}>Shade{" "}
                            <Help
                                content="The darker color that will be mixed with your primary colors to create darker tones"
                                id="shade-tooltip"
                                placement={"bottom-start"} /></p>
                        <Swatch color={shadeColor} name={shadeName}
                                updateSwatch={function (color: string, name: string): void {
                                    setShade(color, name);
                                    buildSwatches();
                                }}
                                id={shade.id}
                        />
                    </div>
                    {/* <div className={"col col-6"}> */}
                    <div className={"col col-6"}>
                        <p className={"figma-subtitle"}>Tint
                            <Help
                                content="The lighter color that will be mixed with your primary colors to create lighter tones"
                                placement={"bottom-start"} />
                        </p>

                        <Swatch color={tintColor} name={tintName}
                                updateSwatch={function (color: string, name: string): void {
                                    setTint(color, name);
                                    buildSwatches();
                                }}
                                id={tint.id}
                        />
                    </div>
                </div>


            </div>
        );
    }
);

export default ShadeTint;
