import {ReactNode} from "react";

interface AccordionBodyProps {
    children?: ReactNode;
    expanded?: boolean;
}

const AccordionBody = ({children, expanded}: AccordionBodyProps) => {
    return (
        <div className={`accordion-body-container ${expanded ? 'expanded' : 'collapsed'}`}>
            <div className="accordion-body-content show-scroll">
                {children}
            </div>
        </div>
    );
};

export default AccordionBody
