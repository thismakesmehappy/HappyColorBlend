import React from 'react';
import TextAndInput from '../helpers/TextAndInput';

interface RampNameEditorProps {
    rampName: string;
    onRampNameChange: (name: string) => void;
    className?: string;
}

/**
 * Component for editing the shade-tint ramp name
 */
const RampNameEditor: React.FC<RampNameEditorProps> = ({
                                                           rampName,
                                                           onRampNameChange,
                                                           className = "row overflow-auto d-block text-wrap"
                                                       }) => {
    return (
        <div id="shade-tint-ramp-name" className={className}>
            <div data-testid="title" className="col col-12 figma-subtitle figma-mt-sm w-100 overflow-auto text-wrap">
                What do we call the mix?
            </div>
            <div className="col col-12 w-100 d-block text-wrap">
                <TextAndInput
                    inputText={rampName}
                    setInputText={onRampNameChange}
                />
            </div>
        </div>
    );
};

export default RampNameEditor;