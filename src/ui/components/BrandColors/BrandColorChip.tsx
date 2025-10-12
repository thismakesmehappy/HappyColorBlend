import React from 'react';
import {isValidHexColor} from "@ui/helpers/colorMethods";

interface BrandColorChipProps {
    color?: string; // Hex color value
    width?: string | number; // Width of the swatch
    height?: string | number; // Height of the swatch
    style?: React.CSSProperties;
    className?: string;
}

const BrandColorChip: React.FC<BrandColorChipProps> = ({color, width, height, style, className}) => {
    // Combine provided style with the background color and dimensions
    const chipColor = isValidHexColor(color) ? color : "FFFFFF"
    const combinedStyle: React.CSSProperties = {
        backgroundColor: '#' + chipColor,
        width: width || "100%",
        height: height || "100%",
        position: "relative",
        ...style
    };

    return (
        <div
            className={`brand-color-chip ${!isValidHexColor(color) && "invalid"} ${className}`}
            style={combinedStyle}
            data-testid="color-chip"
            data-color={color}
        >
        </div>
    );
};

export default BrandColorChip;
