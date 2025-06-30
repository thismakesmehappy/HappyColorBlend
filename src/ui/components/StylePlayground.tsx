import React, {Fragment} from 'react';
import '../styles/figma/figma-styles.scss';
import TooltipWrapper from "@ui/components/helpers/TooltipWrapper";
import {OverlayTriggerProps, Tooltip} from "react-bootstrap";
import {alertTypes, AlertType} from "@ui/interfaces/AlertLevel";

const StylePlayground: React.FC = () => {

    const locations = ["bottom", "top", "left", "right"]

    return (
        <div className={"figma-p-lg"}>
            {
                alertTypes.map(alertTYpe => {
                    return (<div>
                        <h2>{alertTYpe}</h2>
                        {
                            locations.map(location => {
                                return (<Fragment>
                                    <p>
                                        <TooltipWrapper content={location}
                                                        placement={location as OverlayTriggerProps['placement']}
                                                        type={alertTYpe}
                                        ><span> Tooltip {location} </span></TooltipWrapper>
                                    </p>
                                </Fragment>)
                            })

                        }
                    </div>)
                })
            }

        </div>
    );
};

export default StylePlayground;