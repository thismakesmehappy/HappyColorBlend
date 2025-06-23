import {ClassAndStyle} from "@ui/interfaces/ClassAndStyle";
import Steps from "@ui/components/Steps";
import Settings from "@ui/components/Settings";

interface LeftColumnProps extends ClassAndStyle {
}

const SettingsColumn = ({className, style}: LeftColumnProps) => {
    return (
        <div id="sttings-section" className={`${className}`}>
            <div className={"sticky-top bg-white"}>
                <Steps />
                <Settings />
            </div>
        </div>);
};

export default SettingsColumn
