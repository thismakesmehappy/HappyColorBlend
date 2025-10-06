import FontAwesomeIcon from "@ui/components/helpers/FontAwesomeIcon";

interface AccordionHeaderProps {
    badge?: string;
    header: string;
    onClick?: () => void;
}

const AccordionHeader = (
    {
        badge, header, onClick
    }: AccordionHeaderProps
) => {
    return (
        <div className="accordion-header" onClick={onClick}>
            <div className="accordion-header-tag">
                {badge && <div className={"accordion-badge me-2"}><p>{badge}</p></div>}
                <span className="accordion-header-text">{header}</span>
            </div>
            <div className="accordion-header-arrow"><FontAwesomeIcon icon={"chevron-down"} /></div>

        </div>);
};

export default AccordionHeader
