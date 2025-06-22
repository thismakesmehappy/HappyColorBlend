import "@ui/styles/bootstrap/bootstrap.scss"
import "@ui/styles/main.scss";
import "@ui/styles/layout/main.scss";
import ShadeTint from "@ui/components/ShadeTint";

function App() {
  return (
        <div id = "main-box">
        <div id = "left-column">
            <ShadeTint/>
        </div>
        <div id = "right-column">
          Right Column
        </div>
        </div>
  );
}

export default App;
