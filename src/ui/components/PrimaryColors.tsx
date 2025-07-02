import React from 'react';
import Swatch from "./swatchesInput/Swatch";
import useSwatchStore, {SwatchStoreInputSwatch} from "../store/useSwatchStore";
import FontAwesomeIcon from "./helpers/FontAwesomeIcon";
import {v4 as uuidv4} from 'uuid';
import ColorNamer from 'color-namer';
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import TooltipWrapper from './helpers/TooltipWrapper';
import Help from "@ui/components/helpers/Help";
import {UI_CHANNEL} from "@ui/app.network";
import {PLUGIN} from "@common/networkSides";

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

    const extractColorsFromSelection = async () => {
        try {
            const extractedColors = await UI_CHANNEL.request(PLUGIN, "extractColorsFromSelection", []);

            extractedColors.forEach((colorData: { color: string; name: string }) => {
                const colorName = ColorNamer(`#${colorData.color}`).ntc[0].name;
                const newPrimaryColor: SwatchStoreInputSwatch = {
                    color: colorData.color,
                    name: colorName,
                    id: uuidv4(),
                };
                addPrimaryColor(newPrimaryColor);
            });

            buildSwatches();
        } catch (error) {
            console.error('Failed to extract colors from selection:', error);
            alert(error instanceof Error ? error.message : 'Failed to extract colors from selection.');
        }
    };
    return (
        <div
            className={className}
            style={style}
            id="primary-colors"
            data-testid="primary-colors"
        >
            <div className={"figma-subtitle"}>Primary Colors <span onClick={createRandomPrimaryColor}>
                <FontAwesomeIcon icon={"circle-plus"} className={"figma-icon figma-text-primary fa-2x"} /></span>
                {" "}
                <span onClick={extractColorsFromSelection}>
                    <FontAwesomeIcon icon={"eye-dropper"} className={"figma-icon figma-text-primary fa-2x"} />
                </span>
                {" "}
                <Help
                    content="These are the base colors that will be mixed"
                    id="primary-colors-tooltip"
                />
            </div>

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
