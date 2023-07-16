import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function SuccessModal(props) {
    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>{props.successMessage}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.bodyMessage}</Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={() => props.handleClose()}>
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>
    );
}