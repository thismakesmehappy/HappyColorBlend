import Title from "./components/Title/Title.tsx";
import UserInput from "./components/UserInput/UserInput.tsx";
import {PreviewChips} from "./components/PreviewChips/PreviewChips.tsx";
import {GenerateChips} from "./components/GenerateChips/GenerateChips.tsx";
import './styles/index.scss'

function App() {

   return (
      <div className={'container-fluid padded'}>
          <Title/>
          <UserInput/>
          <PreviewChips/>
          <GenerateChips/>
      </div>
   )
}

export default App