import React from 'react';
import '../../scss/column-layout.scss';
import OptionalClassName from "../../interfaces/OptionalClassName";


const ColumnSpacer: React.FC<OptionalClassName> = ({className}) => {
    return <div className={`column-spacer ${className || ''}`}></div>;
};

export default ColumnSpacer;