import SwatchesOutput from "@ui/components/SwatchesOutput";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";

interface SwatchesOutputProps extends ClassAndStyle {
}

const OutputSection = ({className, style}: SwatchesOutputProps) => {
    return (<div id="output-section" className={className}>
        <SwatchesOutput />
        <div className={"sticky-bottom bg-white generate text-end figma-p-md"}>
            <button className={"btn figma-bg-primary figma-text-light figma-mr-md"}>Add Variables</button>
            <button className={"btn figma-bg-primary figma-text-light figma-mr-md"}>Add Styles</button>
            <button className={"btn figma-bg-primary figma-text-light"}>Create Swatches in Page</button>
        </div>
    </div>);
};

export default OutputSection;
