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
}) => {
  const initials = firstNameLastName
    .split(" ")
    .map((name) => name[0] ?? "")
    .join("");

  return (
    <div
      className={cx(styles.root, { [styles.selected]: isSelected })}
      onClick={() => toggleContactSelection(id)}
    >
      <div className={styles.topRow}>
        <div className={styles.initials}>{initials}</div>
        <div className={styles.nameJobTitle}>
          <div className={styles.firstNameLastName} title={firstNameLastName}>
            {isPinned && "📌"} {firstNameLastName}
          </div>
          <div className={styles.jobTitle} title={jobTitle}>
            {jobTitle}
          </div>
        </div>
      </div>
      <div className={styles.emailAddress} title={emailAddress}>
        {emailAddress}
      </div>
    </div>
  );
};
