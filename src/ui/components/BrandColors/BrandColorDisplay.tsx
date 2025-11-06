import SwatchProps from "../../interfaces/SwatchProps";
import useSwatchStore from "@ui/store/useSwatchStore";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Chip from "@ui/components/SwatchesInput/Chip";
import SwatchLabels from "@ui/components/SwatchesInput/SwatchLabels";
import Button from "@ui/components/helpers/Button";

const BrandColorDisplay = ({
                               color,
                               name,
                               id,
                               className
                           }: SwatchProps) => {
    const removePrimaryColor = useSwatchStore(state => state.removePrimaryColor);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);

    const handleDelete = (id: string) => {
        removePrimaryColor(id as string);
        buildSwatches();
    }

    return (
        <div className={"d-flex flex-row align-items-center mb-3"}>
            <div style={{flexShrink: 0}}>
                <Chip color={color} className={"figma-border"} width={50}
                      height={50} data-testid="swatch-chip" />
            </div>
            <div className="flex-grow-1 text-start px-2">
                <SwatchLabels
                    swatchColor={color}
                    swatchName={name}
                />
            </div>
            <div style={{flexShrink: 0}}>
                <Button
                    onClick={() => handleDelete(id as string)}
                    type={'danger'}
                >
                    <i className="bi bi-trash"></i></Button>
            </div>
        </div>
    );
};

export default BrandColorDisplay;
