import Badge from "@ui/components/helpers/Badge";
import useSwatchStore from "@ui/store/useSwatchStore";

const CustomStepBadges = () => {
    const customSteps = useSwatchStore((state) => state.customSteps);
    const removeCustomStep = useSwatchStore((state) => state.removeCustomStep);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    return (<div className="figma-mt-sm p-0" data-testid="custom-steps-badges">
        {Array.from(customSteps).map(step => {
            return <Badge key={`custom-${step}`} className={"figma-mr-sm"}
                          type="primary" iconRight={"minus"} onClick={() => {
                removeCustomStep(step);
                buildSwatches();
            }} data-testid={`custom-step-badge-${step}`}>
                {String(step)}
            </Badge>
        })}
    </div>);
};

export default CustomStepBadges
