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
            className={"brand-color-chip " + className || ""}
            style={combinedStyle}
            data-testid="color-chip"
            data-color={color}
        >
            {!isValidHexColor(color) &&
                <svg
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none"
                    }}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <line
                        x1="0"
                        y1="100"
                        x2="100"
                        y2="0"
                        stroke="red"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>}
        </div>
    );
};

export default BrandColorChip;
