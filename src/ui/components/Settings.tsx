import React from 'react';
import {ClassAndStyle} from '../interfaces/ClassAndStyle';
import Case from "./tokenSettings/Case";
import Spaces from "./tokenSettings/Spaces";
import Leading from "./tokenSettings/Leading";
import Separator from "./tokenSettings/Separator";

/**
 * Component for extra settings including token name configuration
 */
export const Settings: React.FC<ClassAndStyle> = ({className = '', style = {}}) => {

    return (
        <>
            <div className={"figma-subtitle"}>Token Name Options</div>
            <div
                id="settings"
                className={`${className} figma-text`}
                style={style}>

                <Case />
                <Spaces />
                <Leading />
                <Separator />
            </div>
        </>
    );
};

export default Settings;
