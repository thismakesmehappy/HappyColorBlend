import React, {forwardRef, useState} from 'react';
import '../scss/column-layout.scss';
import Section from './Section';
import FontAwesomeIcon from './helpers/FontAwesomeIcon';
import Chip from "./swatch";
import Swatch from "./swatch/Swatch";

interface DarkLightProps {
    className?: string;
    style?: React.CSSProperties;
}

const DarkLight = forwardRef<HTMLDivElement, DarkLightProps>(
    ({className, style}, ref) => {
        const [darkName, setDarkName] = useState('dark');
        const [darkColor, setDarkColor] = useState('FF0000');
        const [lightName, setLightName] = useState('light');
        const [lightColor, setLightColor] = useState('FFFFFF');

        return (
            <Section
                id="dark-light"
                className={className}
                ref={ref}
                style={style}
            >
                {/* Dark-light content */}
                <div className={"row"}>
                    <div className={"col col-6"}>
                        <p className={"figma-subtitle"}>Light</p>
                        <Swatch color={lightColor} name={lightName} />
                    </div>
                    <div className={"col col-6"}>
                        <p className={"figma-subtitle"}>Dark</p>
                        <Swatch color={darkColor} name={darkName} />
                    </div>
                </div>
            </Section>
        );
    }
);

export default DarkLight;
