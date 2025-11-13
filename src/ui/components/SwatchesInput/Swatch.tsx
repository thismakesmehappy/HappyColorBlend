import SwatchProps from "../../interfaces/SwatchProps";
import Chip from "@ui/components/SwatchesInput/Chip";
import SwatchLabels from "@ui/components/SwatchesInput/SwatchLabels";

const Swatch = ({
                    color,
                    name,
                    className,
                }: SwatchProps) => {

    return (
        <div className={('text-center ') + className} data-testid="swatch-container">
            <div className='d-inline-block' data-testid="swatch-chip-container">
                <Chip color={color} className={"figma-border"} width={75}
                      height={75} data-testid="swatch-chip" />
            </div>
            <div className={"separator-md"}></div>
            <div data-testid="swatch-labels-container">
                <SwatchLabels
                    swatchColor={color}
                    swatchName={name}
                />
            </div>
        </div>
    );
};

export default Swatch;
