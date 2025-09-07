import { BaseComponentProps } from "./BaseInterfaces";

interface SwatchProps extends BaseComponentProps {
    color: string;
    name: string;
    displayOnly?: boolean;
    canDelete?: boolean;
    canPick?: boolean;
    updateSwatch?: (color: string, name: string, id?: string) => void;
    onDelete?: (id: string) => void;
}

export default SwatchProps;
