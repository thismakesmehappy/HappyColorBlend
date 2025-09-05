import React from "react";

// Base interface for common component props
export interface BaseComponentProps {
    className?: string;
    style?: React.CSSProperties;
    id?: string;
}

// Base interface for color data
export interface BaseColor {
    color: string;
    name: string;
}

// Color with unique identifier
export interface IdentifiableColor extends BaseColor {
    id: string;
}
