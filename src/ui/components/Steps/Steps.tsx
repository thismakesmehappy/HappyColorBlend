import Explain from "@ui/components/helpers/Explain";
import Group from "@ui/components/helpers/Group";
import EqualSteps from "@ui/components/Steps/EqualSteps";
import CustomSteps from "@ui/components/Steps/CustomSteps";
import CustomStepBadges from "@ui/components/Steps/CustomStepBadges";
import React from "react";

const Steps = () => {
    return (
        <div>
            <Explain>Evenly spaced steps included in each scale. </Explain>
            <Group>
                <div className={"d-flex align-middle"}><p className={"me-2"}>Equal steps:</p>
                    <EqualSteps /></div>
            </Group>
            <Explain>Additional custom steps, between 1 and 999. These are always included, regardless of the even steps. </Explain>
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
