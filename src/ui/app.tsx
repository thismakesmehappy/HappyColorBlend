import "@ui/styles/bootstrap/bootstrap.scss"
import "@ui/styles/main.scss";
import "@ui/styles/layout/main.scss";
import LeftColumn from "@ui/components/LeftColumn";

function App() {
  return (
        <div id = "main-box">
       <LeftColumn className="h-100"/>
        <div id = "right-column">
          Right Column
        </div>
        </div>
  );
}

export default App;
