import React from 'react';
import '../scss/column-layout.scss';
import OptionalClassName from "../interfaces/OptionalClassName";


const RowDivider: React.FC<OptionalClassName> = ({className}) => {
    return <div className={`row-divider ${className || ''}`}></div>;
};

export default RowDivider;