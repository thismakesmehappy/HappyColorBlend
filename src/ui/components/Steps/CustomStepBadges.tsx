import Badge from "@ui/components/helpers/Badge";
import useSwatchStore from "@ui/store/useSwatchStore";

const CustomStepBadges = () => {
    const customSteps = useSwatchStore((state) => state.customSteps);
    const removeCustomStep = useSwatchStore((state) => state.removeCustomStep);
    const buildSwatches = useSwatchStore((state) => state.buildSwatches);
    const buildColorScales = useSwatchStore((state) => state.buildColorScale);
    return (<div className="figma-mt-sm p-0" data-testid="custom-steps-badges d-flex">
        {Array.from(customSteps).map(step => {
            return <Badge key={`custom-${step}`} className={"figma-mr-sm figma-mb-xs"}
                          type="primary" iconRight={"minus"} onClick={() => {
                removeCustomStep(step);
                buildSwatches();
                buildColorScales();
            }} data-testid={`custom-step-badge-${step}`}>
                {String(step)}
            </Badge>
        })}
    </div>);
};

export default CustomStepBadges
