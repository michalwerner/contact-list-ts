import React from "react";

import styles from "./PersonInfo.module.css";

type Props = {
  data: {
    firstNameLastName: string;
    jobTitle: string;
    emailAddress: string;
  };
};

export const PersonInfo: React.FC<Props> = ({ data }) => (
  <div className={styles.root}>
    <div className={styles.firstNameLastName}>{data.firstNameLastName}</div>
    <div className={styles.jobTitle}>{data.jobTitle}</div>
    <div className={styles.emailAddress}>{data.emailAddress}</div>
  </div>
);
