import memoize from "memoize-one";
import React from "react";
import type { ListChildComponentProps } from "react-window";
import { FixedSizeList } from "react-window";

import { LIST_HEIGHT, LIST_ITEM_HEIGHT } from "../../config";
import type { UIContact } from "../../types/Contact";
import { PersonInfo } from "../PersonInfo/PersonInfo";
import styles from "./ContactList.module.css";

type ItemData = {
  contacts: UIContact[];
  toggleContactSelection: (contactId: string) => void;
};

const Row: React.FC<ListChildComponentProps<ItemData>> = ({
  data,
  index,
  style,
}) => (
  <div style={style}>
    <PersonInfo
      contact={data.contacts[index]}
      toggleContactSelection={data.toggleContactSelection}
    />
  </div>
);

type Props = {
  contacts: UIContact[];
  toggleContactSelection: (contactId: string) => void;
  listRef: React.MutableRefObject<FixedSizeList>;
};

const createItemData = memoize(
  (
    contacts: UIContact[],
    toggleContactSelection: (contactId: string) => void
  ) => ({
    contacts,
    toggleContactSelection,
  })
);

export const ContactList: React.FC<Props> = ({
  contacts,
  toggleContactSelection,
  listRef,
}) => {
  const itemData = createItemData(contacts, toggleContactSelection);

  return (
    <div className={styles.root}>
      <FixedSizeList
        height={LIST_HEIGHT}
        itemCount={contacts.length}
        itemData={itemData}
        itemSize={LIST_ITEM_HEIGHT}
        width="100%"
        ref={listRef}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
};
