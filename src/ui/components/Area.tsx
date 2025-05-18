import React, {forwardRef, ReactNode} from 'react';

interface AreaProps {
    id?: string;
    className?: string;
    children?: ReactNode;
    style?: React.CSSProperties;
}

const Area = forwardRef<HTMLDivElement, AreaProps>(
    ({id, className, children, style}, ref) => {
        return (
            <div
                id={id}
                className={className}
                ref={ref}
                style={style}
            >
                {children}
            </div>
        );
    }
);

export default Area;