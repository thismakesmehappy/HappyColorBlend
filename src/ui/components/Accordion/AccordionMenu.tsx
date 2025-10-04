import Accordion from "@ui/components/Accordion/Accordion";
import AccordionHeader from "@ui/components/Accordion/AccordionHeader";
import AccordionItem from "@ui/components/Accordion/AccordionItem";
import AccordionBody from "@ui/components/Accordion/AccordionBody";
import React, {useState} from "react";
import EqualSteps from "@ui/components/steps/EqualSteps";
import CustomSteps from "@ui/components/steps/CustomSteps";
import CustomStepBadges from "@ui/components/steps/CustomStepBadges";
import Explain from "@ui/components/helpers/Explain";
import VerticalSeparator from "@ui/components/helpers/VerticalSeparator";
import Group from "@ui/components/helpers/Group";
import OutputButtons from "@ui/components/swatchesOutput/OutputButtons";
import TokenNamingSample from "@ui/components/TokenNamingSample";
import {Col, Row} from "react-bootstrap";
import Case from "@ui/components/tokenSettings/Case";
import Spaces from "@ui/components/tokenSettings/Spaces";
import Leading from "@ui/components/tokenSettings/Leading";
import Separator from "@ui/components/tokenSettings/Separator";
import BrandColors from "@ui/components/BrandColors/BrandColors";

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
                <AccordionItem expanded={expanded[0]}>
                    <AccordionHeader badge="?" header="Instructions" onClick={() => updateExpanded(0)} />
                    <AccordionBody expanded={expanded[0]}>
                        <p>Lorem ipsum what?</p>
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem expanded={expanded[1]}>
                    <AccordionHeader badge="1" header="Brand Colors" onClick={() => updateExpanded(1)} />
                    <AccordionBody expanded={expanded[1]}>
                        <BrandColors />
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem expanded={expanded[2]}>
                    <AccordionHeader badge="2" header="Number of Steps" onClick={() => updateExpanded(2)} />
                    <AccordionBody expanded={expanded[2]}>
                        <div>
                            <Explain>How many tints and shades are generated for each scale.</Explain>
                            <Group>
                                <div className={"d-flex align-middle"}><p className={"me-2"}>Equal steps:</p>
                                    <EqualSteps /></div>
                            </Group>
                            <Group>
                                <div className={"d-flex align-middle"}><p className={"me-2"}>Custom steps:</p>
                                    <CustomSteps />
                                </div>
                                <CustomStepBadges />
                            </Group>
                        </div>

                    </AccordionBody>
                </AccordionItem>
                <AccordionItem expanded={expanded[3]}>
                    <AccordionHeader badge="3" header="Light and Dark" onClick={() => updateExpanded(3)} />
                    <AccordionBody expanded={expanded[3]}>
                        <p>Lorem ipsum what?</p>
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem expanded={expanded[4]}>
                    <AccordionHeader badge="4" header="Naming Options" onClick={() => updateExpanded(4)} />
                    <AccordionBody expanded={expanded[4]}>
                        {/*TODO: Fix column alignment for all sections*/}
                        <Explain>
                            Configure how the color names will be converted to token names.
                        </Explain>
                        {/*<TokenNamingSample className="figma-mb-lg" />*/}
                        <Group>
                            <Case />
                        </Group>
                        <Group>
                            <Spaces />
                        </Group>
                        <Group>
                            <Leading />
                        </Group>
                        <Group>
                            <Separator />
                        </Group>
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem expanded={expanded[5]}>
                    <AccordionHeader badge="5" header="Output" onClick={() => updateExpanded(5)} />
                    <AccordionBody expanded={expanded[5]}>
                        <OutputButtons />
                    </AccordionBody>
                </AccordionItem>
            </Accordion>

        </div>
    );
};

export default AccordionMenu
