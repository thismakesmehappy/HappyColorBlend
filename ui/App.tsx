import Title from "./components/Title/Title.tsx";
import UserInput from "./components/UserInput/UserInput.tsx";
import {PreviewChips} from "./components/PreviewChips/PreviewChips.tsx";
import {GenerateChips} from "./components/GenerateChips/GenerateChips.tsx";
import './styles/index.scss'

function App() {

    return (
        <div className={'container-fluid padded'}>
            <div className={"vstack gap-1"}>
                <Title />
                <UserInput />
                <GenerateChips />
                <PreviewChips />
            </div>
        </div>
    )
}

export default App