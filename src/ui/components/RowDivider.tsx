import React from 'react';
import '../scss/column-layout.scss';

interface RowDividerProps {
  className?: string;
}

const RowDivider: React.FC<RowDividerProps> = ({ className }) => {
  return <div className={`row-divider ${className || ''}`}></div>;
};

export default RowDivider;