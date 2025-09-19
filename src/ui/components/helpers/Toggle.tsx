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

    const toggleJustification = value ? 'start' : 'end';

    return (
        <div
            className={`toggle-container ${value ? 'figma-bg-primary' : 'figma-bg-secondary-gray'} ${className}`}
            onClick={handleToggle}
            style={{
                display: "flex",
                alignItems: "center",
                width: `${3 * size}em`,
                height: `$1.875em`,
                borderRadius: `${0.9375 * size}em`,
                cursor: "pointer",
                position: "relative",
                transition: "all 0.3s ease"
            }}
        >
            <div
                className="toggle-button"
                style={{
                    transition: "all 0.3s ease",
                    display: "flex",
                    // justifyContent: `{${value ? 'start' : 'end'}`,
                    justifyContent: toggleJustification,
                    alignItems: "center",
                    width: `100%`,
                    height: `100%`,
                    padding: `0.25rem`,
                    borderRadius: "50%"
                }}
            >
                <FontAwesomeIcon
                    icon={value ? "circle-check" : "circle-xmark"}
                    className="figma-icon figma-text-light"
                    style={{fontSize: `${size}em`, padding: 0, margin: 0}}
                />
            </div>
        </div>
    );
};

export default Toggle;
