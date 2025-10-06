import SwatchProps from "../../interfaces/SwatchProps";
import Chip from "@ui/components/swatchesInput/Chip";
import SwatchLabels from "@ui/components/swatchesInput/SwatchLabels";
import {Button} from "react-bootstrap";
import useSwatchStore from "@ui/store/useSwatchStore";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

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
                <Chip color={color} className={"figma-border"} width={75}
                      height={75} data-testid="swatch-chip" />
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
                    variant={"danger"}
                >
                    <i className="bi bi-trash"></i></Button>
            </div>
        </div>
    );
};

export default BrandColorDisplay;
