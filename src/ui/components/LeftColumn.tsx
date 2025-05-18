import React from 'react';
import Area from './Area';
import DarkLight from './DarkLight';
import Bases from './Bases';
import RowDivider from './RowDivider';

interface LeftColumnProps {
    className?: string;
    style?: React.CSSProperties;
    darkLightRef?: React.RefObject<HTMLDivElement>;
}

const LeftColumn: React.FC<LeftColumnProps> = ({className, style, darkLightRef}) => {
    return (
        <Area
            id="left-column"
            className={className}
            style={style}
        >
            <DarkLight ref={darkLightRef} />
            <RowDivider />
            <Bases />
        </Area>
    );
};

export default LeftColumn;