interface Props {
    color: string;
}
export const ChipColor = ({color}: Props) => {
    return (
        <div className={'chip-color w-100 ratio-2x1 border'} style={{backgroundColor: color}}>
        </div>
    );
};