import React, {useEffect, useState} from "react";
import useTokenNameStore from "../../store/useTokenNameStore";
import {computeTokenName} from "../../helpers/computeTokenName";

const SampleToken = () => {
    const caseTreatment = useTokenNameStore(state => state.caseTreatment);
    const spaceTreatment = useTokenNameStore(state => state.spaceTreatment);
    const leadingCharsCount = useTokenNameStore(state => state.leadingCharsCount);
    const leadingCharType = useTokenNameStore(state => state.leadingCharType);
    const separatorCharsCount = useTokenNameStore(state => state.separatorCharsCount);
    const separatorCharType = useTokenNameStore(state => state.separatorCharType);

    const sampleName = "This is AN eXAmple";
    const [sampleToken, setSampleToken] = useState(computeTokenName(sampleName, caseTreatment, spaceTreatment, leadingCharsCount, separatorCharsCount, leadingCharType, separatorCharType, true));

    useEffect(() => {
        setSampleToken(computeTokenName(sampleName, caseTreatment, spaceTreatment, leadingCharsCount, separatorCharsCount, leadingCharType, separatorCharType, true));
    }, [caseTreatment, spaceTreatment, leadingCharsCount, separatorCharsCount, leadingCharType, separatorCharType]);
    return (<div>{sampleToken}</div>);
};

export default SampleToken
