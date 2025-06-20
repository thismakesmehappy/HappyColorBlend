import React from 'react';
import Swatch from './Swatch';

interface SwatchSectionProps {
    title: string;
    stepValue: string;
    color: string;
    name: string;
    id: string;
    onUpdateSwatch: (color: string, name: string) => void;
    className?: string;
}

/**
 * Reusable component for rendering a swatch section (shade or tint)
 */
const SwatchSection: React.FC<SwatchSectionProps> = ({
                                                         title,
                                                         stepValue,
                                                         color,
                                                         name,
                                                         id,
                                                         onUpdateSwatch,
                                                         className = "col col-6"
                                                     }) => {
    return (
        <div className={className}>
            <p data-testid="title" className="figma-subtitle">{title} — {stepValue}</p>
            <Swatch
                color={color}
                name={name}
                updateSwatch={onUpdateSwatch}
                id={id}
            />
        </div>
    );
};

export default SwatchSection;