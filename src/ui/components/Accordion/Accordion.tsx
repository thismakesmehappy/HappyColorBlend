import {ReactNode} from "react";

interface AccordionProps {
    children?: ReactNode;
}

const Accordion = ({children}: AccordionProps) => {
    return (<div className="accordion-group">
        {children}
    </div>);
};

export default Accordion
