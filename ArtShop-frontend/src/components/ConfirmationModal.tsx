import React from 'react';
import styled from 'styled-components';

interface ConfirmationModalProps {
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
}


const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onCancel, onConfirm }) => {
    return (
        <ModalBackdrop>
            <ModalContent>
                <p>{message}</p>
                <ButtonGroup>
                    <button className="cancel" onClick={onCancel}>Annuler</button>
                    <button className="confirm" onClick={onConfirm}>Confirmer</button>
                </ButtonGroup>
            </ModalContent>
        </ModalBackdrop>
    );
};


const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button.cancel {
        background-color: #ddd;
    }

    button.confirm {
        background-color: #007bff;
        color: white;
    }
`;
export default ConfirmationModal;
