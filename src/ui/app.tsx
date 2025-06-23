import "@ui/styles/bootstrap/bootstrap.scss"
import "@ui/styles/main.scss";
import "@ui/styles/layout/main.scss";
import OutputSection from "@ui/components/OutputSection";
import SettingsSection from "@ui/components/SettingsSection";
import SwatchInputSection from "@ui/components/SwatchInputSection";

function App() {
    return (
        <div id="main-box">
            <SwatchInputSection className="h-100 figma-pt-md figma-pl-md figma-pb-md figma-pr-sm" />
            <SettingsSection className="h-100 figma-pt-md figma-pl-sm figma-pb-md figma-pr-sm" />
            <OutputSection className="h-100 figma-pt-md figma-pl-sm figma-pb-md figma-pr-md" />
        </div>
    );
}

export default App;
