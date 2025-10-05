import EqualSteps from "@ui/components/steps/EqualSteps";
import React from "react";
import CustomSteps from "@ui/components/steps/CustomSteps";
import CustomStepBadges from "@ui/components/steps/CustomStepBadges";
import useSwatchStore from "@ui/store/useSwatchStore";
import VerticalSeparator from "@ui/components/helpers/VerticalSeparator";
import optionalClassName from "@ui/interfaces/OptionalClassName";

const StepsSection = ({className}: optionalClassName) => {
    const customSteps = useSwatchStore((state) => state.customSteps);
    return (
        <div id="steps-section" className={className}>
            <div className={"inner"}>
                <div id={"equal-steps-section"}>
                    <span className="figma-subtitle">Equal Steps: </span>
                    <EqualSteps className="figma-mb-sm figma-ml-xs d-inline-block" />
                </div>
                <div id="custom-steps-section">
                    <span className="figma-subtitle d-inline-block">Custom Steps: </span>
                    <CustomSteps className="figma-ml-sm d-inline-block" />
                    {customSteps.size > 0 && (
                        <CustomStepBadges />
                    )}
                </div>
            </div>
        </div>
    );
};

export default StepsSection;