import React, {MouseEventHandler} from "react";
import {Alerttype} from "../../interfaces/AlertLevel";
import FontAwesomeIcon from "./FontAwesomeIcon";

interface BadgeProps {
    children: string;
    type?: Alerttype;
    className?: string;
    iconRight?: any;
    iconLeft?: any;
    onClick?: MouseEventHandler<HTMLSpanElement>;
    testId?: string;
}

/**
 * A reusable Badge component for displaying labels or tags.
 *
 * @param children - The text to display in the badge
 * @param type - The type of badge (error, success, warning, primary, or default)
 * @param className - Additional CSS classes to apply to the badge
 * @param iconLeft - Icon to display on the left side of the badge
 * @param iconRight - Icon to display on the right side of the badge
 * @param onClick - Function to call when the badge is clicked
 * @param testId optional test id for testing
 */
const Badge: React.FC<BadgeProps> = ({
                                         children,
                                         type = "default",
                                         className = "",
                                         iconLeft = "",
                                         iconRight = "",
                                         onClick,
                                         testId = "",
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
        <span
            className={getBadgeClassName()}
            onClick={onClick}
            data-testid={testId}
        >
            {iconLeft && <><FontAwesomeIcon data-testid={`${testId}-fa-left`}
                                            icon={iconLeft} /> {" "}</>} {children} {iconRight && <>{" "}
            <FontAwesomeIcon
                data-testid={`${testId}fa-right`} icon={iconRight} /></>}
        </span>
    );
}

export default Badge;
