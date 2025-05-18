import React, {forwardRef, ReactNode} from 'react';

interface SectionProps {
    id?: string;
    className?: string;
    children?: ReactNode;
    style?: React.CSSProperties;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
    ({id, className, children, style}, ref) => {
        return (
            <div
                id={id}
                className={{className} + " section"}
                ref={ref}
                style={style}
            >
                {children}
            </div>
        );
    }
);

export default Section;