import React from 'react';
import useSwatchStore from '../../store/useSwatchStore';
import StepBadges from "./StepBadges";

interface StepBadgesProps {
    className?: string;
    'data-testid'?: string;
}

/**
 * Component for rendering equal and custom step badges
 */
const AllStepBadges: React.FC<StepBadgesProps> = ({className, 'data-testid': dataTestId}) => {
    const steps = useSwatchStore((state) => state.steps);
    const customSteps = useSwatchStore((state) => state.customSteps);
    const removeCustomStep = useSwatchStore((state) => state.removeCustomStep);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);

    return (
        <div className={className} data-testid={dataTestId}>
            <StepBadges steps={steps} title={'Equal Steps: '} keyLabel="step" testId='equal-steps' />

            {customSteps.size > 0 &&
                <StepBadges steps={Array.from(customSteps)} title={"Custom Steps: "} keyLabel="custom"
                            testId="custom-steps" type="primary" iconRight="minus"
                            onClick={(step) => {
                                removeCustomStep(step);
                                buildSwatches();
                            }
                            } />}
        </div>
    );
};

export default AllStepBadges;