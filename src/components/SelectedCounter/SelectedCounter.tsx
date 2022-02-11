import React from "react";

import styles from "./SelectedCounter.module.css";

type Props = {
  count: number;
};

export const SelectedCounter: React.FC<Props> = ({ count }) => (
  <div className={styles.root}>Selected contacts: {count}</div>
);
