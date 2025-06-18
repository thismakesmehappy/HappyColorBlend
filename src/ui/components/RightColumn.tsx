import Area from "./helpers/Area";
import Steps from "./Steps";
import RowDivider from "./helpers/RowDivider";
import Settings from "./Settings";
import SwatchesOutput from "./SwatchesOutput";
import React from "react";
import {ClassAndStyle} from "../interfaces/ClassAndStyle";

const RightColumn = ({className, style}: ClassAndStyle) => {
    return (<Area
        id="right-column"
        className="h-100"
    >
        <div className={"sticky-top bg-white"}>
            <Steps />
            <RowDivider />
            <Settings />
            <RowDivider />
        </div>
        <SwatchesOutput className="overflow-scroll" />
        <div className={"sticky-bottom bg-white generate text-end"} style={{height: '100'}}>
            <div className={"divide"} />
            <button className={"btn figma-bg-primary figma-text-light figma-mr-md"}>Add Variables</button>
            <button className={"btn figma-bg-primary figma-text-light figma-mr-md"}>Add Styles</button>
            <button className={"btn figma-bg-primary figma-text-light"}>Create Swatches in Page</button>
        </div>
    </Area>);
};

export default RightColumn

