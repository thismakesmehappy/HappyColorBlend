import React, {useState, useRef, useEffect} from 'react';
import Section from './helpers/Section';
import {ClassAndStyle} from '../interfaces/ClassAndStyle';
import {IncludeShadeTint} from './steps/IncludeShadeTint';
import {PadZeros} from './steps/PadZeros';
import {tokenName} from '../helpers/tokenName';
import Area from "./helpers/Area";
import ColumnDivider from "./helpers/ColumnDivider";
import useTokenNameStore from "../store/useTokenNameStore";
import Case from "./tokenSettings/Case";
import Spaces from "./tokenSettings/Spaces";
import Leading from "./tokenSettings/Leading";
import Trailing from "./tokenSettings/Trailing";
import SampleToken from "./tokenSettings/SampleToken";

/**
 * Component for extra settings including token name configuration
 */
export const Settings: React.FC<ClassAndStyle> = ({className = '', style = {}}) => {

    return (
        <>
            <Area
                id="settings"
                className={`${className} h-100`}
                style={style}>
                <Section id="settings-steps">
                    <IncludeShadeTint className="figma-mb-sm" />
                    <PadZeros />
                </Section>
                <ColumnDivider />
                <Section id="settings-internal">
                    <Case />
                    <Spaces />
                </Section>
                <ColumnDivider />
                <Leading />
                <ColumnDivider />
                <Trailing />
                <SampleToken />
            </Area>
        </>
    );
};

export default Settings;
