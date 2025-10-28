import {ReactNode} from "react";

interface AccordionProps {
    children?: ReactNode;
    id?: string;
}

const Accordion = ({children, id}: AccordionProps) => {
    const itemId = id ? {id} : {};
    return (<div className="accordion-group" {...itemId}>
        {children}
    </div>);
};

export default Accordion
