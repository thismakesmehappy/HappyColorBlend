import Accordion from "@ui/components/Accordion/Accordion";
import AccordionHeader from "@ui/components/Accordion/AccordionHeader";
import AccordionItem from "@ui/components/Accordion/AccordionItem";
import AccordionBody from "@ui/components/Accordion/AccordionBody";
import React, {useState} from "react";
import BrandColors from "@ui/components/BrandColors/BrandColors";
import Steps from "@ui/components/Steps/Steps";
import TokenSettings from "@ui/components/TokenSettings/TokenSettings";
import TintAndShade from "@ui/components/TintAndShade/TintAndShade";
import {CreateTokens} from "@ui/components/CreateTokens/CreateTokens";

const AccordionMenu = () => {
    type accordionOptions = "none" | "brandColors" | "numberSteps" | "tintAndShade" | "namingOptions" | "createTokens";
    const [expanded, setExpanded] = useState<accordionOptions>("brandColors");

    const sleep = (ms: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    const updateExpanded = async (expand: accordionOptions) => {
        if (expanded === expand) return;
        setExpanded("none");
        await sleep(250);
        setExpanded(expand);
    };

    return (
        <Accordion id="accordion-menu">
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
            <AccordionItem expanded={expanded === "createTokens"}>
                <AccordionHeader badge="5" header="Create Tokens"
                                 onClick={() => updateExpanded("createTokens")} />
                <AccordionBody expanded={expanded === "createTokens"}>
                    <CreateTokens />
                </AccordionBody>
            </AccordionItem>
        </Accordion>
    );
};

export default AccordionMenu
