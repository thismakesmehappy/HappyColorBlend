import React, {useState, useRef, useEffect} from 'react';
import Section from './helpers/Section';
import {ClassAndStyle} from '../interfaces/ClassAndStyle';
import {IncludeShadeTint} from './steps/IncludeShadeTint';
import {PadZeros} from './steps/PadZeros';
import Toggle from './helpers/Toggle';
import NumberToggle from './helpers/NumberToggle';
import {tokenName} from '../helpers/tokenName';
import Area from "./helpers/Area";
import ColumnDivider from "./helpers/ColumnDivider";
import useTokenNameStore from "../store/useTokenNameStore";

/**
 * Component for extra settings including token name configuration
 */
export const Settings: React.FC<ClassAndStyle> = ({className = '', style = {}}) => {
    // Token name settings state
    const caseTreatment = useTokenNameStore(state => state.caseTreatment);
    const setCaseTreatment = useTokenNameStore(state => state.setCaseTreatment);
    const spaceTreatment = useTokenNameStore(state => state.spaceTreatment);
    const setSpaceTreatment = useTokenNameStore(state => state.setSpaceTreatment);
    const leadingCharsCount = useTokenNameStore(state => state.leadingCharsCount);
    const trailingCharsCount = useTokenNameStore(state => state.trailingCharsCount);
    const leadingCharType = useTokenNameStore(state => state.leadingCharType);
    const setLeadingCharType = useTokenNameStore(state => state.setLeadingCharType);
    const trailingCharType = useTokenNameStore(state => state.trailingCharType);
    const setTrailingCharType = useTokenNameStore(state => state.setTrailingCharType);
    const incrementLeadingChars = useTokenNameStore(state => state.incrementLeadingChars);
    const decrementLeadingChars = useTokenNameStore(state => state.decrementLeadingChars);
    const incrementTrailingChars = useTokenNameStore(state => state.incrementTrailingChars);
    const decrementTrailingChars = useTokenNameStore(state => state.decrementTrailingChars);

    const sampleName = "This is AN eXAmple";
    const [sampleToken, setSampleToken] = useState(tokenName(sampleName, caseTreatment, spaceTreatment, leadingCharsCount, trailingCharsCount, leadingCharType, trailingCharType));

    useEffect(() => {
        setSampleToken(tokenName(sampleName, caseTreatment, spaceTreatment, leadingCharsCount, trailingCharsCount, leadingCharType, trailingCharType));
    }, [caseTreatment, spaceTreatment, leadingCharsCount, trailingCharsCount, leadingCharType, trailingCharType]);

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
                    <div>Case:</div>
                    <div>
                        <div data-testid="case-treatment-radio">
                            <label className="figma-mr-sm">
                                <input
                                    type="radio"
                                    name="case-treatment"
                                    value="keep"
                                    checked={caseTreatment === 'keep'}
                                    onChange={() => setCaseTreatment('keep')} />
                                <span>Keep</span>
                            </label>
                            <label className="figma-mr-sm">
                                <input
                                    type="radio"
                                    name="case-treatment"
                                    value="lower"
                                    checked={caseTreatment === 'lower'}
                                    onChange={() => setCaseTreatment('lower')} />
                                <span>Lower</span>
                            </label>
                            <label className="figma-mr-sm">
                                <input
                                    type="radio"
                                    name="case-treatment"
                                    value="upper"
                                    checked={caseTreatment === 'upper'}
                                    onChange={() => setCaseTreatment('upper')} />
                                <span>Upper</span>
                            </label>
                            <label className="">
                                <input
                                    type="radio"
                                    name="case-treatment"
                                    value="title"
                                    checked={caseTreatment === 'title'}
                                    onChange={() => setCaseTreatment('title')} />
                                <span>Title</span>
                            </label>
                        </div>
                    </div>

                    <div className="figma-mt-sm">Spaces:</div>
                    <div>
                        <div data-testid="space-treatment-radio">
                            <label className="figma-radio figma-mr-sm">
                                <input
                                    type="radio"
                                    name="space-treatment"
                                    value="keep"
                                    checked={spaceTreatment === 'keep'}
                                    onChange={() => setSpaceTreatment('keep')} />
                                <span>Keep</span>
                            </label>
                            <label className="figma-mr-sm">
                                <input
                                    type="radio"
                                    name="space-treatment"
                                    value="dash"
                                    checked={spaceTreatment === 'dash'}
                                    onChange={() => setSpaceTreatment('dash')} />
                                <span>Dash</span>
                            </label>
                            <label className="figma-mr-sm">
                                <input
                                    type="radio"
                                    name="space-treatment"
                                    value="underscore"
                                    checked={spaceTreatment === 'underscore'}
                                    onChange={() => setSpaceTreatment('underscore')} />
                                <span>Underscore</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="space-treatment"
                                    value="remove"
                                    checked={spaceTreatment === 'remove'}
                                    onChange={() => setSpaceTreatment('remove')} />
                                <span>Remove</span>
                            </label>
                        </div>
                    </div>
                </Section>
                <ColumnDivider />
                <Section id="settings-leading">
                    <div>Leading:</div>
                    <NumberToggle
                        decreaseFunction={decrementLeadingChars}
                        increaseFunction={incrementLeadingChars}
                        value={leadingCharsCount}
                        minValue={0} />
                    <div data-testid="leading-radio text-center">
                        <label className="figma-mr-sm">
                            <input
                                type="radio"
                                name="leading"
                                value="dash"
                                checked={leadingCharType === 'dash'}
                                onChange={() => setLeadingCharType('dash')} />
                            <span>-</span>
                        </label>
                        <label className="figma-mr-sm">
                            <input
                                type="radio"
                                name="leading"
                                value="underscore"
                                checked={leadingCharType === 'underscore'}
                                onChange={() => setLeadingCharType('underscore')} />
                            <span>_</span>
                        </label>
                    </div>
                </Section>
                <ColumnDivider />
                <Section id="settings-trailing">
                    <div>Trailing:</div>
                    <NumberToggle
                        decreaseFunction={decrementTrailingChars}
                        increaseFunction={incrementTrailingChars}
                        value={trailingCharsCount}
                        minValue={0} />
                    <div data-testid="trailing-radio text-center">
                        <label className="figma-mr-sm">
                            <input
                                type="radio"
                                name="trailing"
                                value="dash"
                                checked={trailingCharType === 'dash'}
                                onChange={() => setTrailingCharType('dash')} />
                            <span>-</span>
                        </label>
                        <label className="figma-mr-sm">
                            <input
                                type="radio"
                                name="trailing"
                                value="underscore"
                                checked={trailingCharType === 'underscore'}
                                onChange={() => setTrailingCharType('underscore')} />
                            <span>_</span>
                        </label>
                    </div>
                </Section>
                <div>{sampleToken}</div>
            </Area>
        </>
    );
};

export default Settings;
