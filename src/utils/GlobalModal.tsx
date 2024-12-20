import React, { ReactNode } from 'react';
import { Modal } from 'antd';

// Define the props type
interface GlobalModalProps {
    body: ReactNode;
    handleModal: (value: boolean) => void;
    modalOpen: boolean
}

const GlobalModal: React.FC<GlobalModalProps> = ({ body, handleModal, modalOpen }) => {

    return (
        <>
            {modalOpen && <Modal
                title="Vertically Centered Modal Dialog"
                centered
                open={modalOpen}
                onOk={() => handleModal(true)}
                onCancel={() => handleModal(false)}
            >
                {body}
            </Modal>}
        </>
    );
};

export default GlobalModal;
