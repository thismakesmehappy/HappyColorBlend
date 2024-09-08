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

const UserInputChip = ({name, label, stepValue, value, setValue, defaultValue}: Props) => {
    return (
        <>
            <p className={"text-center mb-0"}>{label}</p>
            <p className={"text-center mb-1"}>{stepValue}</p>
            <div className={'mb-1'}>
                <ChipColor color={value} />
            </div>
            <div className={'mb-0'}>
                    <input
                        id={`user-input-chip-${name}`}
                        value={value}
                        onChange={event =>
                            setValue(event.target.value)}
                        className={'w-100 form-control mb-1 text-center'}
                    />

                    {defaultValue && <button
                        className="btn btn-secondary w-100 mb-0"
                        onClick={() => {
                            setValue(defaultValue)}}>
                        Use {defaultValue}
                    </button>}
            </div>
        </>
    );
};

export default UserInputChip;