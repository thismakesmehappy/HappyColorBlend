import React, {useEffect, useState} from "react";
import useTokenNameStore from "../../store/useTokenNameStore";
import {computeTokenName} from "../../helpers/computeTokenName";

const SampleToken = () => {
    const caseTreatment = useTokenNameStore(state => state.caseTreatment);
    const spaceTreatment = useTokenNameStore(state => state.spaceTreatment);
    const leadingCharsCount = useTokenNameStore(state => state.leadingCharsCount);
    const leadingCharType = useTokenNameStore(state => state.leadingCharType);
    const trailingCharsCount = useTokenNameStore(state => state.trailingCharsCount);
    const trailingCharType = useTokenNameStore(state => state.trailingCharType);

    const sampleName = "This is AN eXAmple";
    const [sampleToken, setSampleToken] = useState(computeTokenName(sampleName, caseTreatment, spaceTreatment, leadingCharsCount, trailingCharsCount, leadingCharType, trailingCharType));

    useEffect(() => {
        setSampleToken(computeTokenName(sampleName, caseTreatment, spaceTreatment, leadingCharsCount, trailingCharsCount, leadingCharType, trailingCharType));
    }, [caseTreatment, spaceTreatment, leadingCharsCount, trailingCharsCount, leadingCharType, trailingCharType]);
    return (<div>{sampleToken}</div>);
};

export default SampleToken
