import cx from "classnames";
import React from "react";

import type { UIContact } from "../../types/Contact";
import styles from "./PersonInfo.module.css";

type Props = {
  contact: UIContact;
  toggleContactSelection: (contactId: string) => void;
};

export const PersonInfo: React.FC<Props> = ({
  contact: {
    data: { id, jobTitle, emailAddress, firstNameLastName },
    isSelected,
    isPinned,
  },
  toggleContactSelection,
}) => (
  <div
    className={cx(styles.root, { [styles.selected]: isSelected })}
    onClick={() => toggleContactSelection(id)}
  >
    <div className={styles.firstNameLastName}>
      {isPinned && "📌"} {firstNameLastName}
    </div>
    <div className={styles.jobTitle}>{jobTitle}</div>
    <div className={styles.emailAddress}>{emailAddress}</div>
  </div>
);
