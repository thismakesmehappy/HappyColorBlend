import "@ui/styles/main.scss";
import "@ui/styles/layout/main.scss";
import "@ui/styles/figma/figma-styles.scss"
import "@ui/styles/components/components.scss";
import "@ui/styles/bootstrap/bootstrap.scss"
import OutputSection from "@ui/components/OutputSection";
import AccordionMenu from "@ui/components/Accordion/AccordionMenu";
import useSwatchStore from "@ui/store/useSwatchStore";
import { useEffect } from "react";

function App() {
    const buildSwatches = useSwatchStore(state => state.buildSwatches);
    const buildColorScale = useSwatchStore(state => state.buildColorScale);
    
    // Initialize swatches on app load
    useEffect(() => {
        buildSwatches();
        buildColorScale();
    }, [buildSwatches, buildColorScale]);

    return (
        <div>
            <div id="main-box">
                <AccordionMenu />
                <OutputSection />
            </div>
        </div>
    );
}

export default App;
