import React from 'react';
import Area from './Area';
import ShadeTint from './ShadeTint';
import PrimaryColors from './PrimaryColors';
import RowDivider from './RowDivider';

interface LeftColumnProps {
    className?: string;
    style?: React.CSSProperties;
    shadeTintRef?: React.RefObject<HTMLDivElement>;
}

const LeftColumn: React.FC<LeftColumnProps> = ({className, style, shadeTintRef}) => {
    return (
        <Area
            id="left-column"
            className={className}
            style={style}
        >
            <ShadeTint ref={shadeTintRef} />
            <RowDivider />
            <PrimaryColors />
        </Area>
    );
};

export default LeftColumn;
