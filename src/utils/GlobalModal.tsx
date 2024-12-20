import React, { ReactNode } from 'react';
import { Modal } from 'antd';

// Define the props type
interface GlobalModalProps {
    body: ReactNode;
    handleModal: (isOpen: boolean) => void;
    modalOpen: boolean
}

const GlobalModal: React.FC<GlobalModalProps> = ({ body, handleModal, modalOpen }) => {

    return (
        <>
            {modalOpen && <Modal
                centered
                open={modalOpen}
                onCancel={() => handleModal(false)}
                footer={false}
            >
                {body}
            </Modal>}
        </>
    );
};

export default GlobalModal;
