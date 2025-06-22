import ShadeTint from "@ui/components/ShadeTint";
import PrimaryColors from "@ui/components/PrimaryColors";
import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";

interface LeftColumnProps extends ClassAndStyle{
}
const LeftColumn = ({className, style} :LeftColumnProps) => {
    return (
        <div id = "left-column" className={className}>
      <ShadeTint className={"sticky-top bg-white figma-pl-md figma-pb-md figma-pt-md"}/>
      <PrimaryColors className={"figma-pl-md figma-pb-md"}/>
    </div>);
};

export default LeftColumn
