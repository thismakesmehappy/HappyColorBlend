interface SwatchProps {
    color: string;
    name: string;
    canDelete?: boolean;
    display?: boolean;
    horizontal?: boolean;
    className?: string;
    id?: string;
    updateSwatch: (color: string, name: string, id?: string) => void;
    onDelete?: (id: string) => void;
}

export default SwatchProps;
