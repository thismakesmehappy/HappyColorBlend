import React from "react";

interface ButtonProps {
    className?: string;
    type: 'primary' | 'secondary' | 'danger' | 'tertiary';
    disabled?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
    round?: boolean;
}

const styles = {
    'primary': 'figma-btn figma-btn-primary',
    'secondary': 'figma-btn figma-btn-secondary',
    'tertiary': 'figma-btn figma-btn-tertiary',
    'danger': 'figma-btn figma-btn-danger'
}


const Button = ({className, type, disabled, onClick, children}: ButtonProps) => {
    const style = `${styles[type]} ${disabled && 'disabled'} ${className}`.trim();
    return (<button className={style}
                    disabled={disabled}
                    onClick={onClick}>{children}
    </button>);
};

export default Button
