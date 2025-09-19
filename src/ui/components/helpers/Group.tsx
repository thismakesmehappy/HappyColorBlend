import {ReactNode} from "react";

interface GroupProps {
    children?: ReactNode
}

const Group = ({children}: GroupProps) => {
    return (
        <div className={"group"}>
            {children}
        </div>
    );
};

export default Group
