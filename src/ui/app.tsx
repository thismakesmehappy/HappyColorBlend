import "@ui/styles/bootstrap/bootstrap.scss"
import "@ui/styles/main.scss";
import "@ui/styles/layout/main.scss";
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
