import Badge from "@ui/components/helpers/Badge";
import useSwatchStore from "@ui/store/useSwatchStore";

const EqualStepsBadges = () => {
    const steps = useSwatchStore((state) => state.steps);

    return (
        <div data-testid="equal-steps-badges" id="equal-steps-badges">
            {steps.map(step => {
                return <Badge key={`step-${step}`} className={"figma-mr-sm figma-mb-xs"}
                              data-testid={`equal-step-badge-${step}`}>{String(step)}</Badge>
            })}
        </div>);
};

export default EqualStepsBadges
