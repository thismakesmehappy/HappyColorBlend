import useStepsStore from "../../hooks/useSteps.ts";

export const GenerateChips = () => {
    const {steps} = useStepsStore()
    return (
        <div className={"hstack gap-1"}>
            <button
                className="btn btn-secondary col"
                onClick={() => {
                    console.log(steps)
                }}>
                Create chips in document
            </button>
        </div>
    );
};