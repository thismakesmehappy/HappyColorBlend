import React from "react";
import {Alerttype} from "../../interfaces/AlertLevel";
import FontAwesomeIcon from "./FontAwesomeIcon";

interface BadgeProps {
    children: string;
    type?: Alerttype;
    className?: string;
    iconRight?: any;
    iconLeft?: any;
}

/**
 * A reusable Toast component for displaying temporary notifications.
 *
 * @param chilrden - The message to display in the toast
 * @param type - The type of toast (error, success, warning, or default)
 */
const Badge: React.FC<BadgeProps> = ({
                                         children,
                                         type = "default",
                                         className = "",
                                         iconLeft = "",
                                         iconRight = "",
                                     }: BadgeProps) => {

    const getBadgeClassName = () => {
        let newClassName = className! + ' badge';

        switch (type) {
            case "error":
                newClassName += " figma-bg-danger figma-text-light";
                break;
            case "success":
                newClassName += " figma-bg-success figma-text-light";
                break;
            case "warning":
                newClassName += " figma-bg-warning figma-text-dark";
                break;
            case "primary":
                // Default toast has no additional class
                newClassName += " figma-bg-primary figma-text-light";
                break;
            default:
                // Default toast has no additional class
                newClassName += " figma-bg-component figma-text-light";
                break;
        }

        return newClassName;
    };

    return (
        <span className={getBadgeClassName()}>
            <FontAwesomeIcon icon={iconLeft} /> {children} <FontAwesomeIcon icon={iconRight} />
        </span>
    );
}

export default Badge;