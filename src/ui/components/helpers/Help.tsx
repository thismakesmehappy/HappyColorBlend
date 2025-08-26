import TooltipWrapper from "@ui/components/helpers/TooltipWrapper";
import FontAwesomeIcon from "@ui/components/helpers/FontAwesomeIcon";
import React from "react";
import {OverlayTriggerProps} from "react-bootstrap";
import {AlertType} from "@ui/interfaces/AlertLevel";

export interface HelpProps {
    content: string;
    placement?: OverlayTriggerProps['placement'];
    maxWidth?: string;
    id?: string;
    className?: string;
    type?: AlertType;
}

const Help = ({
                  content,
                  placement = 'top',
                  maxWidth = '150',
                  id = 'tooltip',
                  className = '',
                  type = 'component',
              }: HelpProps) => {
    return (<div className={"d-inline-block"} style={{verticalAlign: 'middle'}}>
        <TooltipWrapper
            content={content}
            id={id}
            className={className}
            placement={placement}
            maxWidth={maxWidth}
            type={type}
        >
            <FontAwesomeIcon icon={"circle-question"}
                             className={`figma-text-component ${className}`}
                             style={{verticalAlign: 'middle'}} />
        </TooltipWrapper>
    </div>);
};
export default Help
