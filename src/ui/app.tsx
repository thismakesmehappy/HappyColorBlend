import "@ui/styles/main.scss";
import "@ui/styles/layout/main.scss";
import "@ui/styles/figma/figma-styles.scss"
import "@ui/styles/components/components.scss";
import "@ui/styles/bootstrap/bootstrap.scss"
import OutputSection from "@ui/components/Output/OutputSection";
import AccordionMenu from "@ui/components/Accordion/AccordionMenu";
import useSwatchStore from "@ui/store/useSwatchStore";
import {useEffect} from "react";

function App() {
    const buildSwatches = useSwatchStore(state => state.buildSwatches);
    const buildColorScale = useSwatchStore(state => state.buildColorScale);
    const loadState = useSwatchStore(state => state.loadState);
    const saveState = useSwatchStore(state => state.saveState);

    // Load state on app mount and save on changes
    useEffect(() => {
        loadState().then(() => {
            buildSwatches();
            buildColorScale();
        });
    }, [loadState, buildSwatches, buildColorScale]);

    // Auto-save state changes
    useEffect(() => {
        const unsubscribe = useSwatchStore.subscribe(saveState);
        return unsubscribe;
    }, [saveState]);

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
