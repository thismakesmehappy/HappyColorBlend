import React, {useState} from 'react';
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
import Toast from "./helpers/Toast";
import {TOAST_DURATION} from "../../constants/uiConstants";

// Helper function to filter color names to allow only alphabetic characters and spaces
function getAlphabeticColorName(hexColor: string): string {
    const originalName = ColorNamer(hexColor).ntc[0].name;
    return originalName.replace(/[^a-zA-Z\s]/g, '').trim();
}

interface PrimaryColorsProps extends ClassAndStyle {
}

const PrimaryColors = ({className, style}: PrimaryColorsProps) => {
    const primaryColors = useSwatchStore((state) => state.primaryColors);
    const updatePrimaryColor = useSwatchStore((state) => state.updatePrimaryColor);
    const addPrimaryColor = useSwatchStore((state) => state.addPrimaryColor);
    const removePrimaryColor = useSwatchStore((state) => state.removePrimaryColor);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);

    const [showWarningToast, setShowWarningToast] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");

    const hideWarningToast = () => {
        setShowWarningToast(false);
    };

    const createRandomPrimaryColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
        const randomName = getAlphabeticColorName(`#${randomColor}`);
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

            const existingColors = primaryColors.map(color => color.color.toUpperCase());
            const duplicateColors: string[] = [];
            const newColors: Array<{ color: string; name: string }> = [];

            extractedColors.forEach((colorData: { color: string; name: string }) => {
                const normalizedColor = colorData.color.toUpperCase();
                if (existingColors.includes(normalizedColor)) {
                    duplicateColors.push(normalizedColor);
                } else {
                    newColors.push(colorData);
                }
            });

            // Add only new colors
            newColors.forEach((colorData: { color: string; name: string }) => {
                const colorName = getAlphabeticColorName(`#${colorData.color}`);
                const newPrimaryColor: SwatchStoreInputSwatch = {
                    color: colorData.color,
                    name: colorName,
                    id: uuidv4(),
                };
                addPrimaryColor(newPrimaryColor);
            });

            // Show warning toast for duplicates
            if (duplicateColors.length > 0) {
                const duplicateList = duplicateColors.map(color => `#${color}`).join(', ');
                setWarningMessage(`${duplicateColors.length === 1 ? 'Color' : 'Colors'} already exist${duplicateColors.length === 1 ? 's' : ''}: ${duplicateList}`);
                setShowWarningToast(true);
            }

            // Build swatches if we added any new colors
            if (newColors.length > 0) {
                buildSwatches();
            }
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

            <Toast
                message={warningMessage}
                type="warning"
                duration={TOAST_DURATION}
                isVisible={showWarningToast}
                onClose={hideWarningToast}
            />
        </div>
    );
};

export default PrimaryColors;
