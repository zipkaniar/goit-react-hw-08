import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import styles from "./AddContactForm.module.css";

const AddContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Telefon numarası format kontrolü (Örn: 10 haneli olmalı)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Lütfen geçerli bir telefon numarası girin! (10 haneli)");
      return;
    }

    dispatch(addContact({ name, number: phone }));
    setName("");
    setPhone("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          value={phone}
          onChange={(e) => {
            // Sadece sayılar girilebilsin
            const numericValue = e.target.value.replace(/\D/g, "");
            setPhone(numericValue);
          }}
          maxLength="10" // En fazla 10 karakter
          required
          placeholder="Enter phone number"
        />
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default AddContactForm;
