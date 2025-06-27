import React from 'react';
import Swatch from "./swatchesInput/Swatch";
import useSwatchStore, {SwatchStoreInputSwatch} from "../store/useSwatchStore";
import FontAwesomeIcon from "./helpers/FontAwesomeIcon";
import {v4 as uuidv4} from 'uuid';
import ColorNamer from 'color-namer';
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import TooltipWrapper from './helpers/TooltipWrapper';

interface PrimaryColorsProps extends ClassAndStyle {
}

const PrimaryColors = ({className, style}: PrimaryColorsProps) => {
    const primaryColors = useSwatchStore((state) => state.primaryColors);
    const updatePrimaryColor = useSwatchStore((state) => state.updatePrimaryColor);
    const addPrimaryColor = useSwatchStore((state) => state.addPrimaryColor);
    const removePrimaryColor = useSwatchStore((state) => state.removePrimaryColor);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    const createRandomPrimaryColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
        const randomName = ColorNamer(`#${randomColor}`).ntc[0].name;
        const newPrimaryColor: SwatchStoreInputSwatch = {
            color: randomColor,
            name: randomName,
            id: uuidv4(),
        };
        addPrimaryColor(newPrimaryColor);
        buildSwatches();
    };
    return (
        <div
            className={className}
            style={style}
            id="primary-colors"
            data-testid="primary-colors"
        >
            <p className={"figma-subtitle"}>Primary Colors <span onClick={createRandomPrimaryColor}>
                <FontAwesomeIcon icon={"circle-plus"} className={"figma-icon figma-text-primary fa-2x"} />
                {" "}<TooltipWrapper
                content="These are the base colors that will be mixed"
                type="component"
                id="primary-colors-tooltip"
            >
                    <FontAwesomeIcon icon={"circle-question"}
                                     className='figma-text-component' />
                </TooltipWrapper>
            </span></p>

            <div className={"row"}>
                {/* Primary Colors content */}
                {primaryColors.map((primaryColor: SwatchStoreInputSwatch) => (
                    <Swatch key={primaryColor.id} name={String(primaryColor.name)} color={String(primaryColor.color)}
                            className={"col col-6 mb-4"} canDelete={true}
                            updateSwatch={function (color: string, name: string, id?: string): void {
                                updatePrimaryColor(id!, color, name);
                                buildSwatches();
                            }}
                            onDelete={(id) => {
                                removePrimaryColor(id);
                                buildSwatches()
                            }}
                            id={primaryColor.id} />
                ))
                }
            </div>
        </div>
    );
};

export default PrimaryColors;
