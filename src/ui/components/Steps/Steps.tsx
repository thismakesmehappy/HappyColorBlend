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
            <Explain>Yuy can specify custom steps not equally spaced. Values must be between 1 and 999, excluding 500 (which is always included step). </Explain>
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
