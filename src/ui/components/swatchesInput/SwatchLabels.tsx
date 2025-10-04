interface SwatchLabelsProps {
    swatchColor: string;
    swatchName: string;
    className?: string;
}

const SwatchLabels = ({
                          swatchColor,
                          swatchName,
                          className
                      }: SwatchLabelsProps) => {


    return (
        <div className={"vstack " + className} data-testid="swatch-labels-display">
            <p className="container-fluid fw-bold mb-0 selectable-text" data-testid="swatch-name-display">
                {swatchName}
            </p>
            <p className="container-fluid selectable-text" data-testid="swatch-color-display">
                #{swatchColor}</p>
        </div>
    );
};

export default SwatchLabels
