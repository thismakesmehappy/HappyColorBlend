import Explain from "@ui/components/helpers/Explain";
import Group from "@ui/components/helpers/Group";
import EqualSteps from "@ui/components/Steps/EqualSteps";
import CustomSteps from "@ui/components/Steps/CustomSteps";
import CustomStepBadges from "@ui/components/Steps/CustomStepBadges";
import React from "react";

const Steps = () => {
    return (
        <div>
            <Explain>How many values are generated for each scale. These steps will be evenly spaced. </Explain>
            <Group>
                <div className={"d-flex align-middle"}><p className={"me-2"}>Equal steps:</p>
                    <EqualSteps /></div>
            </Group>
            <Explain>If you want to specify additional steps that are not equally spaced, add them as equal steps. Values must be between 1 and 999. </Explain>
            <Group>
                <div className={"d-flex align-middle"}><p className={"me-2"}>Custom steps:</p>
                    <CustomSteps />
                </div>
                <CustomStepBadges />
            </Group>
        </div>
    );
};

export default Steps
