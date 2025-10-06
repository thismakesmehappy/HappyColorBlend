import "@ui/styles/main.scss";
import "@ui/styles/layout/main.scss";
import "@ui/styles/figma/figma-styles.scss"
import "@ui/styles/components/components.scss";
import "@ui/styles/bootstrap/bootstrap.scss"
import OutputSection from "@ui/components/OutputSection";
import AccordionMenu from "@ui/components/Accordion/AccordionMenu";

function App() {
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
