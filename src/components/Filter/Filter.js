import React from "react";
import styles from "./Filter.module.css";
import shortid from "shortid";

const nameInputId = shortid.generate();

const Filter = ({ value, onChange }) => (
  <div className={styles.filter}>
    <label className={styles.filter__label} htmlFor={nameInputId}>
      Find contacts by name
    </label>
    <input
      className={styles.filter__input}
      type="text"
      name="filter"
      id={nameInputId}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default Filter;
