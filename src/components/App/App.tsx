import React, { useCallback, useEffect, useRef, useState } from "react";
import type { FixedSizeList } from "react-window";

import { LIST_ITEM_HEIGHT, MAX_INITIAL_LOADING_RETRIES } from "../../config";
import { apiData } from "../../services/api";
import type { UIContact } from "../../types/Contact";
import { ContactList } from "../ContactList/ContactList";
import { LoadMore } from "../LoadMore/LoadMore";
import { SelectedCounter } from "../SelectedCounter/SelectedCounter";
import styles from "./App.module.css";

export const App: React.FC = () => {
  const [contacts, setContacts] = useState<UIContact[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [isAllDataLoaded, setAllDataLoaded] = useState(false);

  const selectedContacts = contacts
    .filter((contact) => contact.isSelected)
    .map((contact) => ({ ...contact, isPinned: true }));
  const contactsWithSelected = [...selectedContacts, ...contacts];

  const listRef = useRef<FixedSizeList>(null as never);

  const loadData = useCallback(
    async (noScroll = false): Promise<boolean> => {
      setError(false);
      setLoading(true);

      try {
        const result = await apiData();
        const newContacts = result.map((contact) => ({
          data: contact,
          isSelected: false,
          isPinned: false,
        }));

        if (newContacts.length === 0) {
          setAllDataLoaded(true);
        } else {
          const allContacts = [...contacts, ...newContacts];
          setContacts(allContacts);

          if (!noScroll) {
            listRef.current?.scrollToItem(
              allContacts.length +
                allContacts.filter((contact) => contact.isSelected).length
            );
          }
        }
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
        return false;
      }

      setLoading(false);
      return true;
    },
    [contacts]
  );

  useEffect(() => {
    let retryCount = 0;

    const loadDataWithRetry = async () => {
      const isSuccess = await loadData(true);
      if (isSuccess) {
        return;
      }
      retryCount += 1;
      if (retryCount < MAX_INITIAL_LOADING_RETRIES) {
        console.log(
          `Retrying... (${retryCount}/${MAX_INITIAL_LOADING_RETRIES}`
        );
        await loadDataWithRetry();
      }
    };

    void loadDataWithRetry();
    // eslint wants loadData as a dependency, but that would trigger a loading loop
    // because contacts is a dependency for loadData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleContactSelection = useCallback(
    (contactId: string): void => {
      const isCurrentlySelected = contacts.find(
        (contact) => contact.data.id === contactId
      )?.isSelected;

      setContacts((currentContacts) =>
        currentContacts.map((contact) => {
          if (contact.data.id === contactId) {
            return {
              ...contact,
              isSelected: !contact.isSelected,
            };
          }
          return contact;
        })
      );

      if (listRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const currentScroll: number =
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
          (listRef.current as any)._outerRef.scrollTop;

        if (isCurrentlySelected) {
          listRef.current.scrollTo(currentScroll - LIST_ITEM_HEIGHT);
        } else {
          listRef.current.scrollTo(currentScroll + LIST_ITEM_HEIGHT);
        }
      }
    },
    [contacts]
  );

  return (
    <div className={styles.root}>
      <SelectedCounter count={selectedContacts.length} />
      {contactsWithSelected.length > 0 && (
        <ContactList
          contacts={contactsWithSelected}
          toggleContactSelection={toggleContactSelection}
          listRef={listRef}
        />
      )}
      <LoadMore
        loadData={loadData}
        isLoading={isLoading}
        hasError={hasError}
        isAllDataLoaded={isAllDataLoaded}
      />
    </div>
  );
};
