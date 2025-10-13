import Accordion from "@ui/components/Accordion/Accordion";
import AccordionHeader from "@ui/components/Accordion/AccordionHeader";
import AccordionItem from "@ui/components/Accordion/AccordionItem";
import AccordionBody from "@ui/components/Accordion/AccordionBody";
import React, {useState} from "react";
import BrandColors from "@ui/components/BrandColors/BrandColors";
import Steps from "@ui/components/Steps/Steps";
import TokenSettings from "@ui/components/TokenSettings/TokenSettings";
import TintAndShade from "@ui/components/LightAndDark/TintAndShade";

const AccordionMenu = () => {
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({
        0: false,
        1: true,
        2: false,
        3: false,
        4: false,
        5: false
    });

    const sleep = (ms: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    const updateExpanded = async (index: number) => {
        if (expanded[index]) return;
        setExpanded({0: false, 1: false, 2: false, 3: false, 4: false, 5: false});
        await sleep(300); // Changed to 300ms as per your request
        setExpanded(prev => ({
            ...prev,
            [index]: true
        }));
    };

    return (
        <div id="accordion-menu">
            <Accordion>
                <AccordionItem key="brand-colors" expanded={expanded[1]}>
                    <AccordionHeader badge="1" header="Brand Colors" onClick={() => updateExpanded(1)} />
                    <AccordionBody expanded={expanded[1]}>
                        <BrandColors />
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem expanded={expanded[2]}>
                    <AccordionHeader badge="2" header="Number of Steps" onClick={() => updateExpanded(2)} />
                    <AccordionBody expanded={expanded[2]}>
                        <Steps />

                    </AccordionBody>
                </AccordionItem>
                <AccordionItem expanded={expanded[3]}>
                    <AccordionHeader badge="3" header="Tint and Shade" onClick={() => updateExpanded(3)} />
                    <AccordionBody expanded={expanded[3]}>
                        <TintAndShade />
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem expanded={expanded[4]}>
                    <AccordionHeader badge="4" header="Naming Options" onClick={() => updateExpanded(4)} />
                    <AccordionBody expanded={expanded[4]}>
                        <TokenSettings />
                    </AccordionBody>
                </AccordionItem>
            </Accordion>

        </div>
    );
};

export default AccordionMenu
