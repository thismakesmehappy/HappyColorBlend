import {ReactNode} from "react";
import {Collapse} from "react-bootstrap";

interface AccordionBodyProps {
    children?: ReactNode;
    expanded?: boolean;
}

const AccordionBody = ({children, expanded}: AccordionBodyProps) => {
    return (
        <Collapse in={expanded} timeout={200}>
            <div className="accordion-body-container">
                <div className="accordion-body-content show-scroll">
                    {children}
                </div>
            </div>
        </Collapse>
    );
};

export default AccordionBody
