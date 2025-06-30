import React from 'react';
import {OverlayTrigger, Tooltip, OverlayTriggerProps} from 'react-bootstrap';
import {AlertType} from '../../interfaces/AlertLevel';

export interface TooltipWrapperProps {
    children: React.ReactNode;
    content: string;
    placement?: OverlayTriggerProps['placement'];
    maxWidth?: string;
    type?: AlertType;
    id?: string;
}

/**
 * Enhanced Bootstrap Tooltip wrapper with maxWidth and status coloring
 *
 * @param children - The element(s) that trigger the tooltip on hover
 * @param content - The text content to display in the tooltip
 * @param placement - Position relative to trigger element (top, bottom, left, right, etc.)
 * @param maxWidth - Maximum width of the tooltip (any CSS unit)
 * @param status - Visual status/type for color styling (error, success, warning, primary, component)
 * @param id - Unique ID for the tooltip (required for accessibility)
 */
const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
                                                           children,
                                                           content,
                                                           placement = 'top',
                                                           maxWidth = '200',
                                                           type,
                                                           id = 'tooltip'
                                                       }) => {
    const getStatusStyles = () => {
        switch (type) {
            case "error":
                return "figma-bg-danger figma-text-light";
            case "success":
                return "figma-bg-success figma-text-light";
            case "warning":
                return "figma-bg-warning figma-text-dark";
            case "primary":
                // Default toast has no additional class
                return "figma-bg-primary figma-text-light";
            case "component":
                // Default toast has no additional class
                return "figma-bg-component figma-text-light";
            default:
                return "figma-bg-secondary figma-text-dark"
        }
    };

    const tooltipStyle: React.CSSProperties = {
        maxWidth: maxWidth || 'none',
        whiteSpace: maxWidth ? 'normal' : 'nowrap',
        // ...getStatusStyles()
    };

    return (
        <OverlayTrigger
            placement={placement}
            overlay={
                <Tooltip
                    id={id}
                    style={tooltipStyle}
                    className={getStatusStyles()}
                >
                    {content}
                </Tooltip>
            }
        >
      <span style={{display: 'inline-block'}}>
        {children}
      </span>
        </OverlayTrigger>
    );
};

export default TooltipWrapper;