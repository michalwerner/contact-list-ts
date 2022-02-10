import React from "react";
import type { Contact } from "src/types/Contact";

import { PersonInfo } from "../PersonInfo/PersonInfo";
import styles from "./ContactList.module.css";

type Props = {
  contacts: Contact[];
};

export const ContactList: React.FC<Props> = ({ contacts }) => (
  <div className={styles.root}>
    {contacts.map((personInfo) => (
      <PersonInfo key={personInfo.id} data={personInfo} />
    ))}
  </div>
);
