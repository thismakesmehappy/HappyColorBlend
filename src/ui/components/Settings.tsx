import React from 'react';
import {ClassAndStyle} from '../interfaces/ClassAndStyle';
import Area from "./helpers/Area";
import ColumnDivider from "./helpers/ColumnDivider";
import Case from "./tokenSettings/Case";
import Spaces from "./tokenSettings/Spaces";
import Leading from "./tokenSettings/Leading";
import Trailing from "./tokenSettings/Trailing";

/**
 * Component for extra settings including token name configuration
 */
export const Settings: React.FC<ClassAndStyle> = ({className = '', style = {}}) => {

    return (
        <>
            <div className={"figma-subtitle"}>Token Name Options</div>
            <Area
                id="settings"
                className={`${className} h-100 figma-text`}
                style={style}>

                <Case />
                <ColumnDivider />
                <Spaces />
                <ColumnDivider />
                <Leading />
                <ColumnDivider />
                <Trailing />
            </Area>
        </>
    );
};

export default Settings;
