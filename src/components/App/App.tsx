import React, { useEffect, useState } from "react";

import { apiData } from "../../services/api";
import type { Contact } from "../../types/Contact";
import { ContactList } from "../ContactList/ContactList";
import { LoadMore } from "../LoadMore/LoadMore";
import { SelectedContacts } from "../SelectedContacts/SelectedContacts";
import styles from "./App.module.css";

export const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const loadData = async () => {
    setError(false);
    setLoading(true);
    try {
      const result = await apiData();
      setContacts((currentContacts) => [...currentContacts, ...result]);
    } catch (error) {
      console.error(error);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    void loadData();
  }, []);

  return (
    <div className={styles.root}>
      <SelectedContacts selectedContacts={[]} />
      <ContactList contacts={contacts} />
      <LoadMore loadData={loadData} isLoading={isLoading} hasError={hasError} />
    </div>
  );
};
