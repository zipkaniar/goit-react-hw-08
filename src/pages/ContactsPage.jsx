import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContacts,
  updateContact,
  deleteContact,
} from '../redux/contacts/operations';
import {
  selectContacts,
  selectContactsError,
  selectContactsLoading,
} from '../redux/contacts/selectors';

import EditContactForm from '../components/EditContactForm/EditContactForm';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal/DeleteConfirmationModal';
import './ContactsPage.module.css';
import { selectIsLoggedIn } from '../redux/auth/selectors'; // Auth selector

const ContactsPage = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);
  const isLoggedIn = useSelector(selectIsLoggedIn); // Kullanıcının giriş yapıp yapmadığını kontrol et
  const dispatch = useDispatch();

  const [editingContact, setEditingContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Veri çekme işlemini sadece kullanıcı giriş yapmışsa çağır
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  // Düzenleme işlemi
  const startEditing = contact => {
    setEditingContact(contact);
  };

  const stopEditing = () => {
    setEditingContact(null);
  };

  const handleUpdate = updatedValues => {
    dispatch(updateContact({ id: editingContact.id, values: updatedValues }));
    stopEditing();
  };

  // Silme işlemi
  const openModal = contactId => {
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
    <div className="contacts-page">
      <h1>Your Contacts</h1>

      {error && <p className="error-message">Something went wrong: {error}</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && contacts.length === 0 && (
        <p>No contacts found. Add some!</p>
      )}
      {!isLoading && contacts.length > 0 && (
        <ul className="contact-list">
          {contacts.map(contact => (
            <li key={contact.id} className="contact-item">
              <span>{contact.name}</span>
              <span>{contact.number || contact.phone}</span>
              <div>
                <button
                  className="edit-button"
                  onClick={() => startEditing(contact)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => openModal(contact.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editingContact && (
        <EditContactForm
          initialValues={editingContact}
          onSubmit={handleUpdate}
          onCancel={stopEditing}
        />
      )}

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ContactsPage;
