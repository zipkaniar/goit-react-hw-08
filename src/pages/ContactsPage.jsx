import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contacts/operations';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal/DeleteConfirmationModal';

const ContactsPage = () => {
  const contacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const openModal = (contactId) => {
    setIsModalOpen(true);
    setContactToDelete(contactId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setContactToDelete(null);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      dispatch(deleteContact(contactToDelete));
    }
    closeModal();
  };

  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.phone}
            <button onClick={() => openModal(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ContactsPage;
