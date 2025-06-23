import ShadeTint from "@ui/components/ShadeTint";
import PrimaryColors from "@ui/components/PrimaryColors";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";

interface LeftColumnProps extends ClassAndStyle {
}

const SwatchInputSection = ({className, style}: LeftColumnProps) => {
    return (
        <div id="input-section" className={className}>
            <ShadeTint />
            <PrimaryColors />
        </div>);
};

export default SwatchInputSection
