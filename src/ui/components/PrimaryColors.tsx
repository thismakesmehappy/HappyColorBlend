import React, { useCallback } from 'react';
import '../scss/column-layout.scss';
import Section from "./helpers/Section";
import Swatch from "./swatchesInput/Swatch";
import useSwatchStore, {SwatchStoreInputSwatch} from "../store/useSwatchStore";
import FontAwesomeIcon from "./helpers/FontAwesomeIcon";
import { PrimaryColorService } from '../services';

interface PrimaryColorsProps {
    className?: string;
    style?: React.CSSProperties;
}

/**
 * Component for managing primary colors
 * Optimized with useCallback for better performance.
 */
const PrimaryColors: React.FC<PrimaryColorsProps> = ({className, style}) => {
    const primaryColors = useSwatchStore((state) => state.primaryColors);
    const updatePrimaryColor = useSwatchStore((state) => state.updatePrimaryColor);
    const addPrimaryColor = useSwatchStore((state) => state.addPrimaryColor);
    const removePrimaryColor = useSwatchStore((state) => state.removePrimaryColor);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);

    const createRandomPrimaryColor = useCallback(() => {
        const newPrimaryColor = PrimaryColorService.createRandomPrimaryColor();
        addPrimaryColor(newPrimaryColor);
        buildSwatches();
    }, [addPrimaryColor, buildSwatches]);

    const handleUpdateSwatch = useCallback((color: string, name: string, id?: string) => {
        updatePrimaryColor(id!, color, name);
        buildSwatches();
    }, [updatePrimaryColor, buildSwatches]);

    const handleDeleteSwatch = useCallback((id: string) => {
        removePrimaryColor(id);
        buildSwatches();
    }, [removePrimaryColor, buildSwatches]);
    return (
        <Section
            id="primary-colors"
            className={className}
            style={style}
        >
            <p className={"figma-subtitle"}>Primary Colors <span onClick={createRandomPrimaryColor}>
                <FontAwesomeIcon icon={"circle-plus"} className={"figma-icon figma-text-primary fa-2x"} />
            </span></p>

            <div className={"row"}>
                {/* Primary Colors content */}
                {primaryColors.map((primaryColor: SwatchStoreInputSwatch) => (
                    <Swatch key={primaryColor.id} name={String(primaryColor.name)} color={String(primaryColor.color)}
                            className={"col col-6 mb-4"} canDelete={true}
                            updateSwatch={handleUpdateSwatch}
                            onDelete={handleDeleteSwatch}
                            id={primaryColor.id} />
                ))
                }
            </div>
        </Section>
    );
};

export default PrimaryColors;
