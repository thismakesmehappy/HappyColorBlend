import React from 'react';
import {Badge, Button} from 'react-bootstrap';
import useTokenNameStore from '@ui/store/useTokenNameStore';
import {computeTokenName} from '@ui/helpers/computeTokenName';

interface TokenNamingSampleProps {
    sampleInput?: string;
    className?: string;
}

const TokenNamingSample: React.FC<TokenNamingSampleProps> = ({
                                                                 sampleInput = "Naming Options",
                                                                 className = ""
                                                             }) => {
    const tokenStore = useTokenNameStore();

    // Transform the sample using current settings
    const transformedPrimitive = computeTokenName(
        sampleInput,
        tokenStore.caseTreatment,
        tokenStore.spaceTreatment,
        tokenStore.leadingCharsCount,
        tokenStore.separatorCharsCount,
        tokenStore.leadingCharType,
        tokenStore.separatorCharType,
        tokenStore.appendSeparatorToPrimitive, // Don't append separator for preview
        true   // Do append prefix
    );

    const transformedToken = computeTokenName(
        sampleInput,
        tokenStore.caseTreatment,
        tokenStore.spaceTreatment,
        tokenStore.leadingCharsCount,
        tokenStore.separatorCharsCount,
        tokenStore.leadingCharType,
        tokenStore.separatorCharType,
        true, // Don't append separator for preview
        true   // Do append prefix
    );

    return (
        <div className={`token-naming-sample ${className}`}>
            <div className="d-flex justify-content-between gap-3">
                <div className="">
                    <p className="figma-text-secondary figma-mr-xs">Preview Token:</p>
                    <p className="figma-text-dark border-dark border-1 figma-border rounded-2 p-1">
                        {transformedToken}<span className={"figma-text-mid"}>500</span>
                    </ p>
                </div>
                <div className="text-end">
                    <p className="figma-text-secondary figma-mr-xs">Preview Primitive:</p>
                    <p className="figma-text-dark border-dark border-1 figma-border rounded-2 p-1">
                        {transformedPrimitive}<span className={"figma-text-mid"}></span>
                    </ p>
                </div>
            </div>
        </div>
    );
};

export default TokenNamingSample;