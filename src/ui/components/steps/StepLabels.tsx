import useSwatchStore from "@ui/store/useSwatchStore";
import Badge from "@ui/components/helpers/Badge";

const StepLabels = () => {
    const steps = useSwatchStore((state) => state.steps);
    const customSteps = useSwatchStore((state) => state.customSteps);
    const removeCustomStep = useSwatchStore((state) => state.removeCustomStep);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    return (
        <div id="step-labels" data-testid="step-labels-section" className={"row"}>
            {/* Step-labels content */}
            <div data-testid="equal-steps-badges" className="p-0">
                <span className="figma-subtitle">Equal Steps: </span>
                {steps.map(step => {
                    return <Badge key={`step-${step}`} className={"figma-mr-sm"}
                                  data-testid={`equal-step-badge-${step}`}>{String(step)}</Badge>
                })}
            </div>
            {customSteps.size > 0 && (
                <div className="figma-mt-sm p-0" data-testid="custom-steps-badges">
                    <span className="figma-subtitle">Custom Steps: </span>
                    {Array.from(customSteps).map(step => {
                        return <Badge key={`custom-${step}`} className={"figma-mr-sm"}
                                      type="primary" iconRight={"minus"} onClick={() => {
                            removeCustomStep(step);
                            buildSwatches();
                        }} data-testid={`custom-step-badge-${step}`}>
                            {String(step)}
                        </Badge>
                    })}
                </div>
            )}
        </div>

    );
};

export default StepLabels
