import {Dispatch, SetStateAction} from "react";
import {ChipColor} from "../chips/ChipColor.tsx";
import "../../styles/index.scss";

interface Props {
    name: string;
    label: string;
    stepValue: number;
    value: string;
    defaultValue?: string;
    setValue: Dispatch<SetStateAction<string>>
}

const ChipInput = ({name, label, stepValue, value, setValue, defaultValue}: Props) => {
    return (
        <div className={"vstack gap-1"}>
            <div>
                <p className={"text-center mb-0"}>{label}</p>
                <p className={"text-center mb-0"}>{stepValue}</p>
            </div>
            <div>
                <ChipColor color={value} />
            </div>
            <input
                id={`user-input-chip-${name}`}
                value={value}
                onChange={event =>
                    setValue(event.target.value)}
                className={'form-control text-center'}
            />

            {defaultValue && <button
                className="btn btn-secondary"
                onClick={() => {
                    setValue(defaultValue)
                }}>
                Use {defaultValue}
            </button>}
        </div>
    );
};

export default ChipInput;