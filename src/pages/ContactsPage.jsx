import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateContact } from '../redux/contacts/operations';
import EditContactForm from '../components/EditContactForm/EditContactForm';
import './ContactsPage.module.css';

const ContactsPage = () => {
  const contacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();
  const [editingContact, setEditingContact] = useState(null);

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

  return (
    <div className="contacts-page">
      <h1>Your Contacts</h1>
      {!contacts.length && <p>No contacts found. Add some!</p>}
      <ul className="contact-list">
        {contacts.map(contact => (
          <li key={contact.id} className="contact-item">
            <span>{contact.name}</span>
            <span>{contact.phone}</span>
            <button className="edit-button" onClick={() => startEditing(contact)}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      {editingContact && (
        <EditContactForm
          initialValues={editingContact}
          onSubmit={handleUpdate}
          onCancel={stopEditing}
        />
      )}
    </div>
  );
};

export default ContactsPage;
