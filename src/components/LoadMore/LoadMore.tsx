import React from "react";

import styles from "./LoadMore.module.css";

type Props = {
  loadData: () => Promise<boolean>;
  isLoading: boolean;
  hasError: boolean;
  isAllDataLoaded: boolean;
};

export const LoadMore: React.FC<Props> = ({
  isLoading,
  hasError,
  loadData,
  isAllDataLoaded,
}) => (
  <div className={styles.root}>
    <button
      className={styles.button}
      disabled={isLoading || isAllDataLoaded}
      onClick={() => {
        void loadData();
      }}
    >
      {isLoading ? "Loading..." : "Load more"}
    </button>
    {isAllDataLoaded && (
      <div className={styles.finished}>Everything loaded.</div>
    )}
    {hasError && (
      <div className={styles.error}>
        Something went wrong. Please try again.
      </div>
    )}
  </div>
);
