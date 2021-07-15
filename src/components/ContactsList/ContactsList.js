import React from "react";
import styles from "./ContactsList.module.css";

const ContactsList = ({ contacts, onDeleteContact }) => (
  <ul className={styles.contacts_list}>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={styles.contacts_item}>
        <p>{name}:</p>
        <p>{number}</p>
        <button
          className={styles.contacts_list__button}
          onClick={() => onDeleteContact(id)}
        >
          Удалить
        </button>
      </li>
    ))}
  </ul>
);

export default ContactsList;
