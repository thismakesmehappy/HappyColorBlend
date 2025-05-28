import React, {useEffect, useState} from "react";
import {Alerttype} from "../../interfaces/AlertLevel";

interface BadgeProps {
    children: string;
    type?: Alerttype;
    className?: string;
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
            default:
                // Default toast has no additional class
                newClassName += " figma-bg-primary figma-text-light";
                break;
        }

        return newClassName;
    };

    return (
        <span className={getBadgeClassName()}>
            {children}
        </span>
    );
};

export default Badge;