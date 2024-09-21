import {mixColors} from "../../helpers/mixColors.ts";
import useStepsStore from "../../hooks/useSteps.ts";
import useChipColors from "../../hooks/useChipColors.ts";
import {ChipColor} from "../chips/ChipColor.tsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import {useStore} from "zustand";


export const PreviewChips = () => {
    const {steps} = useStepsStore();
    const lightColor = useStore(useChipColors, (s) => s.lightColor)
    const baseColor = useStore(useChipColors, (s) => s.baseColor)
    const darkColor = useStore(useChipColors, (s) => s.darkColor)
    const removeStep = useStepsStore((s) => s.removeStep);
    return (
        <div className={"row"}>
            <p>Remove steps by clicking on the <FontAwesomeIcon
                icon={faCircleXmark}
                className={"ms-auto"} /> on the chip. </p>
            {steps.map(step => {
                const color = mixColors(lightColor, baseColor, darkColor, step)
                return (
                    <div className={"col col-1 gap-1 mb-2"}>
                        <ChipColor color={color} />
                        <div className={"badge rounded-pill text-bg-primary w-100  "}>
                            <div className={"d-flex"}>{step} | #{color} <FontAwesomeIcon icon={faCircleXmark}
                                                                                         className={"ms-auto"}
                                                                                         onClick={() => removeStep(step)} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};