import React, { ReactNode } from "react";
import { BaseComponentProps } from "../../interfaces/BaseInterfaces";

interface ScrollableContainerProps extends BaseComponentProps {
    children: ReactNode;
    showScrollbar?: boolean;
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
    children,
    showScrollbar = false,
    className = "",
    style = {},
    id
}) => {
    const containerClass = `scrollable-container ${showScrollbar ? 'show-scrollbar' : ''} ${className}`;

    return (
        <div className={containerClass} style={style} id={id}>
            {children}
        </div>
    );
};

export default ScrollableContainer;
