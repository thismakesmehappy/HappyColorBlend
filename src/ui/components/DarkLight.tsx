import React, {forwardRef} from 'react';
import '../scss/column-layout.scss';
import Section from './Section';

interface DarkLightProps {
    className?: string;
    style?: React.CSSProperties;
}

const DarkLight = forwardRef<HTMLDivElement, DarkLightProps>(
    ({className, style}, ref) => {
        return (
            <Section
                id="dark-light"
                className={className}
                ref={ref}
                style={style}
            >
                {/* Dark-light content */}
                dark-light<br />
                dark-light
            </Section>
        );
    }
);

export default DarkLight;