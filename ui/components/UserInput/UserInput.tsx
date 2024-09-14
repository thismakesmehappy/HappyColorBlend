import ChipsInput from "./ChipsInput.tsx";
import StepsInput from "./StepsInput.tsx";

const UserInput = () => {
    return (
        <div className={"vstack gap-1 mb-0"}>
            <ChipsInput />
            <hr />
            <StepsInput />
        </div>
    );
};

export default UserInput;