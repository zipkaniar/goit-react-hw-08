import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from "../redux/contacts/operations";
import {
  selectContacts,
  selectContactsError,
  selectContactsLoading,
} from "../redux/contacts/selectors";

import AddContactForm from "../components/AddContactForm/AddContactForm";
import EditContactForm from "../components/EditContactForm/EditContactForm";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal/DeleteConfirmationModal";
import "./ContactsPage.module.css"; 
import { selectIsLoggedIn } from "../redux/auth/selectors"; // Kullanıcının giriş durumunu al

const ContactsPage = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const [editingContact, setEditingContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Kullanıcı giriş yaptıysa rehberi getir
  useEffect(() => {
    if (isLoggedIn && contacts.length === 0) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn, contacts.length]);

  //  Yeni kişi ekleme fonksiyonu
  const handleAddContact = (newContact) => {
    const { name, number } = newContact;

    // Boş giriş engellendi
    if (!name.trim() || !number.trim()) {
      alert("İsim ve telefon numarası boş olamaz!");
      return;
    }

    // Telefon numarası doğrulama (10 haneli olmalı)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(number)) {
      alert("Lütfen geçerli bir telefon numarası girin! (10 haneli)");
      return;
    }

    // Zaten var mı kontrolü
    const isDuplicate = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (isDuplicate) {
      alert("Bu kişi zaten eklenmiş!");
      return;
    }

    dispatch(addContact(newContact));
  };

  // ✅ Düzenleme işlemi
  const startEditing = (contact) => {
    setEditingContact(contact);
  };

  const stopEditing = () => {
    setEditingContact(null);
  };

  const handleUpdate = (updatedValues) => {
    dispatch(updateContact({ id: editingContact.id, values: updatedValues }));
    stopEditing();
  };

  // ✅ Silme işlemi
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
    <div className="contacts-page">
      <h1>Rehber</h1>

      {/* Yeni kişi ekleme formu */}
      <AddContactForm onAdd={handleAddContact} />

      {error && <p className="error-message">Bir hata oluştu: {error}</p>}
      {isLoading && <p>Yükleniyor...</p>}
      {!isLoading && contacts.length === 0 && <p>Kişi bulunamadı, ekleyin!</p>}

      {!isLoading && contacts.length > 0 && (
        <ul className="contact-list">
          {contacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              <span>{contact.name}</span>
              <span>{contact.number || contact.phone}</span>
              <div>
                <button className="edit-button" onClick={() => startEditing(contact)}>
                  Düzenle
                </button>
                <button className="delete-button" onClick={() => openModal(contact.id)}>
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/*  Kişi düzenleme formu */}
      {editingContact && (
        <EditContactForm
          initialValues={editingContact}
          onSubmit={handleUpdate}
          onCancel={stopEditing}
        />
      )}

      {/*  Silme onay modali */}
      <DeleteConfirmationModal isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmDelete} />
    </div>
  );
};

export default ContactsPage;
