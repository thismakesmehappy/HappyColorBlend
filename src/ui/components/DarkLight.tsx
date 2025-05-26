import React, {forwardRef, useState} from 'react';
import '../scss/column-layout.scss';
import Section from './Section';
import FontAwesomeIcon from './helpers/FontAwesomeIcon';
import Chip from "./swatch";
import Swatch from "./swatch/Swatch";
import useSwatchStore from "../store/swatchStore";

interface DarkLightProps {
    className?: string;
    style?: React.CSSProperties;
}

const DarkLight = forwardRef<HTMLDivElement, DarkLightProps>(
    ({className, style}, ref) => {
        const dark = useSwatchStore(state => state.getDark());
        const light = useSwatchStore(state => state.getLight());
        const setDark = useSwatchStore(state => state.setDark);
        const setLight = useSwatchStore(state => state.setLight);
        const [darkName, setDarkName] = useState(dark.name);
        const [darkColor, setDarkColor] = useState(dark.color);
        const [lightName, setLightName] = useState(light.name);
        const [lightColor, setLightColor] = useState(light.color);

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
                        <Swatch color={lightColor} name={lightName}
                                updateSwatch={function (color: string, name: string): void {
                                    setLight({color, name});
                                }}

                        />
                    </div>
                    <div className={"col col-6"}>
                        <p className={"figma-subtitle"}>Dark</p>
                        <Swatch color={darkColor} name={darkName}
                                updateSwatch={function (color: string, name: string): void {
                                    setDark({color, name});
                                }}
                        />
                    </div>
                </div>
            </Section>
        );
    }
);

export default DarkLight;
