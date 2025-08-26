import React from 'react';
import {Modal, Button, Row, Col} from 'react-bootstrap';
import Case from '@ui/components/tokenSettings/Case';
import Spaces from '@ui/components/tokenSettings/Spaces';
import Leading from '@ui/components/tokenSettings/Leading';
import Separator from '@ui/components/tokenSettings/Separator';
import {getTooltipProps} from "@ui/constants/tooltips";
import Help from "@ui/components/helpers/Help";
import TokenNamingSample from './TokenNamingSample';
import FontAwesomeIcon from '@ui/components/helpers/FontAwesomeIcon';

interface NamingOptionsModalProps {
    show: boolean;
    onHide: () => void;
}

const NamingOptionsModal: React.FC<NamingOptionsModalProps> = ({show, onHide}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            backdrop={true}
            keyboard={true}
        >
            <Modal.Header className="d-flex justify-content-between align-items-center">
                <p className={"title"}>Token Naming Options <Help {...getTooltipProps("TOKEN_SETTINGS")} /></p>
                <span
                    onClick={onHide}
                    aria-label="Close"
                    style={{
                        background: 'none', 
                        border: 'none', 
                        padding: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '1.5rem'
                    }}
                >
                    <FontAwesomeIcon 
                        icon="circle-xmark" 
                        className={'figma-icon figma-text-primary'} 
                        style={{ pointerEvents: 'none' }}
                    />
                </span>
            </Modal.Header>
            <Modal.Body>
                <div className="figma-p-md">
                    <TokenNamingSample className="figma-mb-lg" />

                    <Row xs={2}>

                        <Col className="figma-mb-lg">
                            <h6 className="figma-mb-sm">Text Case</h6>
                            <Case />
                        </Col>

                        <Col className="figma-mb-lg">
                            <h6 className="figma-mb-sm">Space Treatment</h6>
                            <Spaces />
                        </Col>

                        <Col className="figma-mb-lg">
                            <h6 className="figma-mb-sm">Leading Characters</h6>
                            <Leading />
                        </Col>

                        <Col className="figma-mb-lg">
                            <h6 className="figma-mb-sm">Separator</h6>
                            <Separator />
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            {/*<Modal.Footer>*/}
            {/*    <Button variant="secondary" onClick={onHide}>*/}
            {/*        Close*/}
            {/*    </Button>*/}
            {/*</Modal.Footer>*/}
        </Modal>
    );
};

export default NamingOptionsModal;