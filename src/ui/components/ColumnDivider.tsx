import React from 'react';
import '../scss/column-layout.scss';

interface ColumnDividerProps {
  className?: string;
}

const ColumnDivider: React.FC<ColumnDividerProps> = ({ className }) => {
  return <div className={`column-divider ${className || ''}`}></div>;
};

export default ColumnDivider;