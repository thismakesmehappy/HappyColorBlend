import useSteps from "../../hooks/useSteps.ts";

export const PreviewChips = () => {
    const {stepsArray} = useSteps();
    return (
        <div className={"row"}>
            {stepsArray.map(step => {
                return (
                    <div className={"col-1"}>
                        {step}
                    </div>
                )
            })}
        </div>
    );
};