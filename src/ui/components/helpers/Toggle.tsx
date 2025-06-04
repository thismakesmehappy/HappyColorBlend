import React from "react";
import FontAwesomeIcon from "../helpers/FontAwesomeIcon";

interface ToggleProps {
    value: boolean;
    onChange: (value: boolean) => void;
    className?: string;
    size?: number; // Size in em units (default: 1)
}

const Toggle: React.FC<ToggleProps> = ({value, onChange, className = "", size = 1}) => {
    const handleToggle = () => {
        onChange(!value);
    };

    return (
        <div
            className={`toggle-container ${value ? 'figma-bg-primary' : 'figma-bg-secondary-gray'} ${className}`}
            onClick={handleToggle}
            style={{
                display: "flex",
                alignItems: "center",
                width: `${3 * size}em`,
                height: `${1.875 * size}em`,
                borderRadius: `${0.9375 * size}em`,
                padding: `${0.125 * size}em`,
                cursor: "pointer",
                position: "relative",
                transition: "all 0.3s ease"
            }}
        >
            <div
                className="toggle-button"
                style={{
                    position: "absolute",
                    left: value ? `calc(100% - ${1.75 * size}em)` : `${0.125 * size}em`,
                    transition: "left 0.3s ease",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: `${1.625 * size}em`,
                    height: `${1.625 * size}em`,
                    borderRadius: "50%"
                }}
            >
                <FontAwesomeIcon
                    icon={value ? "circle-check" : "circle-xmark"}
                    className="figma-icon figma-text-light"
                    style={{fontSize: `${size}em`}}
                />
            </div>
        </div>
    );
};

export default Toggle;
