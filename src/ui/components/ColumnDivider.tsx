import React from 'react';
import '../scss/column-layout.scss';
import OptionalClassName from "../interfaces/OptionalClassName";


const ColumnDivider: React.FC<OptionalClassName> = ({className}) => {
    return <div className={`column-divider ${className || ''}`}></div>;
};

export default ColumnDivider;