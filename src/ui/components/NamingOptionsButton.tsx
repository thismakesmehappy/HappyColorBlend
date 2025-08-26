import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import FontAwesomeIcon from '@ui/components/helpers/FontAwesomeIcon';
import NamingOptionsModal from './NamingOptionsModal';

interface NamingOptionsButtonProps {
    variant?: 'outline-primary' | 'primary' | 'secondary' | 'outline-secondary';
    size?: 'sm' | 'lg';
    className?: string;
    showIcon?: boolean;
    children?: React.ReactNode;
}

const NamingOptionsButton: React.FC<NamingOptionsButtonProps> = ({
                                                                     variant = 'outline-primary',
                                                                     className = '',
                                                                     showIcon = true,
                                                                     children
                                                                 }) => {
    const [showNamingModal, setShowNamingModal] = useState(false);

    return (
        <>
            <Button
                variant={variant}
                onClick={() => setShowNamingModal(true)}
                className={`figma-text-primary ${className}`}
            >
                {showIcon && <FontAwesomeIcon icon="cog" className="figma-mr-xs" />}
                {children || 'Naming Options'}
            </Button>

            <NamingOptionsModal
                show={showNamingModal}
                onHide={() => setShowNamingModal(false)}
            />
        </>
    );
};

export default NamingOptionsButton;