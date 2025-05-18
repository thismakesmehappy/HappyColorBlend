import React from 'react';
import Area from './Area';
import Steps from './Steps';
import Swatches from './Swatches';
import RowDivider from './RowDivider';

interface RightColumnProps {
  className?: string;
  style?: React.CSSProperties;
  stepsRef?: React.RefObject<HTMLDivElement>;
  equalStepsRef?: React.RefObject<HTMLDivElement>;
}

const RightColumn: React.FC<RightColumnProps> = ({ 
  className, 
  style, 
  stepsRef, 
  equalStepsRef 
}) => {
  return (
    <Area 
      id="right-column" 
      className={className} 
      style={style}
    >
      <Steps ref={stepsRef} equalStepsRef={equalStepsRef} />
      <RowDivider />
      <Swatches />
    </Area>
  );
};

export default RightColumn;