import {ReactNode} from "react";

interface AccordionItemProps {
    expanded?: boolean;
    children: ReactNode;
}

const AccordionItem = ({expanded, children}: AccordionItemProps) => {
    return (
        <div className={`accordion-item ${expanded ? 'expanded' : ''}`}>
            {children}
        </div>);
};

export default AccordionItem
