import Accordion from "@ui/components/Accordion/Accordion";
import AccordionHeader from "@ui/components/Accordion/AccordionHeader";
import AccordionItem from "@ui/components/Accordion/AccordionItem";
import AccordionBody from "@ui/components/Accordion/AccordionBody";
import React, {useState} from "react";
import BrandColors from "@ui/components/BrandColors/BrandColors";
import Steps from "@ui/components/Steps/Steps";
import TokenSettings from "@ui/components/TokenSettings/TokenSettings";
import TintAndShade from "@ui/components/TintAndShade/TintAndShade";

const AccordionMenu = () => {
    type accordionOptions = "none" | "brandColors" | "numberSteps" | "tintAndShade" | "namingOptions";
    const [expanded, setExpanded] = useState<accordionOptions>("brandColors");

    const sleep = (ms: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    const updateExpanded = async (expand: accordionOptions) => {
        if (expanded === expand) return;
        setExpanded("none");
        await sleep(300); // Changed to 300ms as per your request
        setExpanded(expand);
    };

    return (
        <div id="accordion-menu">
            <Accordion>
                <AccordionItem key="brand-colors" expanded={expanded === "brandColors"}>
                    <AccordionHeader badge="1" header="Brand Colors" onClick={() => updateExpanded("brandColors")} />
                    <AccordionBody expanded={expanded === "brandColors"}>
                        <BrandColors />
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem expanded={expanded === "numberSteps"}>
                    <AccordionHeader badge="2" header="Number of Steps" onClick={() => updateExpanded("numberSteps")} />
                    <AccordionBody expanded={expanded === "numberSteps"}>
                        <Steps />

                    </AccordionBody>
                </AccordionItem>
                <AccordionItem expanded={expanded === "tintAndShade"}>
                    <AccordionHeader badge="3" header="Tint and Shade" onClick={() => updateExpanded("tintAndShade")} />
                    <AccordionBody expanded={expanded === "tintAndShade"}>
                        <TintAndShade />
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem expanded={expanded === "namingOptions"}>
                    <AccordionHeader badge="4" header="Naming Options"
                                     onClick={() => updateExpanded("namingOptions")} />
                    <AccordionBody expanded={expanded === "namingOptions"}>
                        <TokenSettings />
                    </AccordionBody>
                </AccordionItem>
            </Accordion>

        </div>
    );
};

export default AccordionMenu
