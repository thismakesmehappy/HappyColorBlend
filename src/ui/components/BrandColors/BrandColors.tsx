import Explain from "@ui/components/helpers/Explain";
import React from "react";
import BrandColorInput from "@ui/components/BrandColors/BrandColorInput";
import BrandColorsPreview from "@ui/components/BrandColors/BrandColorsPreview";

const BrandColors = () => {
    return (<>
        <Explain>
            Each brand color on the list will produce a new scale.
        </Explain>
        <BrandColorInput />
        <BrandColorsPreview />
    </>);
};

export default BrandColors
