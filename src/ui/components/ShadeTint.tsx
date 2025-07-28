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
        const gradientDirection = useSwatchStore(state => state.getGradientDirection());
        const toggleGradientDirection = useSwatchStore(state => state.toggleGradientDirection);
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

        // Determine display order and labels based on gradient direction
        const isShadeFirst = gradientDirection === 'shade-to-tint';
        const leftSide = isShadeFirst
            ? {
                color: shade,
                displayColor: shadeColor,
                displayName: shadeName,
                label: "Shade",
                updateFn: setShade,
                helpContent: "The darker color that will be mixed with your primary colors to create darker tones"
            }
            : {
                color: tint,
                displayColor: tintColor,
                displayName: tintName,
                label: "Tint",
                updateFn: setTint,
                helpContent: "The lighter color that will be mixed with your primary colors to create lighter tones"
            };

        const rightSide = isShadeFirst
            ? {
                color: tint,
                displayColor: tintColor,
                displayName: tintName,
                label: "Tint",
                updateFn: setTint,
                helpContent: "The lighter color that will be mixed with your primary colors to create lighter tones"
            }
            : {
                color: shade,
                displayColor: shadeColor,
                displayName: shadeName,
                label: "Shade",
                updateFn: setShade,
                helpContent: "The darker color that will be mixed with your primary colors to create darker tones"
            };

        return (
            <div className={className} style={style} data-testid={"shade-tint"} ref={ref}>
                <div className={"row"}>
                    <div className={"col col-6"}>
                        <div className={"figma-subtitle text-center"}>
                            {leftSide.label} <Help
                            content={leftSide.helpContent}
                            id={`${leftSide.color.id}-tooltip`}
                            placement={"bottom-start"}
                            className={"figma-ml-xs"}
                        /><br />
                            0

                        </div>
                        <Swatch
                            color={leftSide.displayColor}
                            name={leftSide.displayName}
                            updateSwatch={function (color: string, name: string): void {
                                leftSide.updateFn(color, name);
                                buildSwatches();
                            }}
                            id={leftSide.color.id}
                            canPick={true}
                        />
                    </div>

                    <div className={"col col-6"}>
                        <div className={"figma-subtitle text-center"}>
                            {rightSide.label} <Help
                            content={rightSide.helpContent}
                            id={`${rightSide.color.id}-tooltip`}
                            placement={"bottom-start"}
                            className={"figma-ml-xs"}
                        /><br />
                            1000

                        </div>
                        <Swatch
                            color={rightSide.displayColor}
                            name={rightSide.displayName}
                            updateSwatch={function (color: string, name: string): void {
                                rightSide.updateFn(color, name);
                                buildSwatches();
                            }}
                            id={rightSide.color.id}
                            canPick={true}
                        />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col text-center"}>

                        <span
                            className={"figma-text-primary"}
                            onClick={toggleGradientDirection}
                            data-testid="flip-gradient-button"
                            style={{padding: '4px 8px'}}
                        >
                            <FontAwesomeIcon icon="arrows-rotate" />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
);

export default ShadeTint;
