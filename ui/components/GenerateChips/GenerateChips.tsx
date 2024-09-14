import useStepsStore from "../../hooks/useSteps.ts";

export const GenerateChips = () => {
    const {steps, setStepsClean} = useStepsStore()
    return (
        <div className={"hstack gap-1"}>
            <button
                className="btn btn-secondary col"
                onClick={() => {
                    setStepsClean(steps)
                }}>
                Preview chips
            </button>

            <button
                className="btn btn-secondary col"
                onClick={() => {
                    setStepsClean(steps)
                }}>
                Create chips in document
            </button>
        </div>
    );
};