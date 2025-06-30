import TooltipWrapper from "@ui/components/helpers/TooltipWrapper";
import FontAwesomeIcon from "@ui/components/helpers/FontAwesomeIcon";
import React from "react";
import {OverlayTriggerProps} from "react-bootstrap";

export interface HelpProps {
    content: string;
    placement?: OverlayTriggerProps['placement'];
    maxWidth?: string;
    id?: string;
}

const Help = ({
                  content,
                  placement = 'top',
                  maxWidth = '150',
                  id = 'tooltip'
              }: HelpProps) => {
    return (<div className={"d-inline-block"} style={{ verticalAlign: 'middle' }}>
        <TooltipWrapper
            content={content}
            id={id}
            placement={placement}
            maxWidth={maxWidth}
            type={"component"}
        >
            <FontAwesomeIcon icon={"circle-question"}
                             className='figma-text-component'
                             style={{ verticalAlign: 'middle' }} />
        </TooltipWrapper>
    </div>);
};
export default Help
