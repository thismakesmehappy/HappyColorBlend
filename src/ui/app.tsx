import "@ui/styles/main.scss";
import "@ui/styles/layout/main.scss";
import "@ui/styles/figma/figma-styles.scss"
import "@ui/styles/components/components.scss";
import "@ui/styles/bootstrap/bootstrap.scss"
import OutputSection from "@ui/components/OutputSection";
import SettingsSection from "@ui/components/SettingsSection";
import SwatchInputSection from "@ui/components/SwatchInputSection";

function App() {
    return (
        <div id="main-box">
            <SwatchInputSection />
            <SettingsSection />
            <OutputSection />
        </div>
    );
}

export default App;
