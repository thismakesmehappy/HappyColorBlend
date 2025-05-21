import React from 'react';

interface SwatchProps {
    color: string; // Hex color value
    width?: string | number; // Width of the swatch
    height?: string | number; // Height of the swatch
    style?: React.CSSProperties;
    className?: string;
}

const Chip: React.FC<SwatchProps> = ({color, width, height, style, className}) => {
    // Combine provided style with the background color and dimensions
    const combinedStyle: React.CSSProperties = {
        backgroundColor: '#' + color,
        width: width || "50px",
        height: height || "50px",
        ...style
    };

    return (
        <div
            className={"chip " + className || ""}
            style={combinedStyle}
        />
    );
};

export default Chip;
