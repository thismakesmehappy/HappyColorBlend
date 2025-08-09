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
        const scaleStart = useSwatchStore(state => state.getScaleStart());
        const scaleEnd = useSwatchStore(state => state.getScaleEnd());
        const setScaleStart = useSwatchStore(state => state.setScaleStart);
        const setScaleEnd = useSwatchStore(state => state.setScaleEnd);
        const buildSwatches = useSwatchStore((state) => state.buildSwatches);
        const swapScaleEndpoints = useSwatchStore(state => state.swapScaleEndpoints);
        const [startName, setStartName] = useState(scaleStart.name);
        const [startColor, setStartColor] = useState(scaleStart.color);
        const [endName, setEndName] = useState(scaleEnd.name);
        const [endColor, setEndColor] = useState(scaleEnd.color);

        useEffect(() => {
            setStartName(scaleStart.name);
            setStartColor(scaleStart.color);
            setEndName(scaleEnd.name);
            setEndColor(scaleEnd.color);
        }, [scaleStart, scaleEnd]);

        // Simplified display - always show start on left, end on right
        const leftSide = {
            color: scaleStart,
            displayColor: startColor,
            displayName: startName,
            label: "Start",
            updateFn: setScaleStart,
            helpContent: "The starting color of your scale that will be mixed with your primary colors"
        };

        const rightSide = {
            color: scaleEnd,
            displayColor: endColor,
            displayName: endName,
            label: "End",
            updateFn: setScaleEnd,
            helpContent: "The ending color of your scale that will be mixed with your primary colors"
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
                            onClick={swapScaleEndpoints}
                            data-testid="swap-scale-button"
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
