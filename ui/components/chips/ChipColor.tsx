interface Props {
    color: string;
    className?: string;
}

export const ChipColor = ({color, className}: Props) => {
    return (
        <div className={'chip-color w-100 ratio-2x1 border ' + className}
             style={{backgroundColor: '#' + color}}>
        </div>
    );
};