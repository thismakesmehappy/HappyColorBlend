import {ReactNode} from "react";

interface ExplainProps {
    children?: ReactNode
}

const Explain = ({children}: ExplainProps) => {
    return (
        <div className="explain">
            {children}
        </div>
    );
};

export default Explain
