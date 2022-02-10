import React from "react";

import type { Contact } from "../../types/Contact";
import styles from "./SelectedContacts.module.css";

type Props = {
  selectedContacts: Contact[];
};

export const SelectedContacts: React.FC<Props> = ({ selectedContacts }) => (
  <div className={styles.root}>
    Selected contacts: {selectedContacts.length}
  </div>
);
