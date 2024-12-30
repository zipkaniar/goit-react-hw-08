import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Modal için erişilebilirlik ayarı

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Delete"
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        content: { maxWidth: '400px', margin: 'auto', textAlign: 'center' },
      }}
    >
      <h2>Are you sure?</h2>
      <p>Do you really want to delete this contact? This action cannot be undone.</p>
      <div>
        <button onClick={onClose}>Cancel</button>
        <button onClick={onConfirm}>Delete</button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
