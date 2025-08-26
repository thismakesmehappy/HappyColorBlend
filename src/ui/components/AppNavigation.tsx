import React from 'react';
import NamingOptionsButton from './NamingOptionsButton';

const AppNavigation: React.FC = () => {
    return (
        <div className="app-navigation figma-p-sm border-bottom">
            <div className="d-flex justify-content-end">
                <NamingOptionsButton />
            </div>
        </div>
    );
};

export default AppNavigation;