import React from "react";

import styles from "./LoadMore.module.css";

type Props = {
  loadData: () => Promise<void>;
  isLoading: boolean;
  hasError: boolean;
};

export const LoadMore: React.FC<Props> = ({
  isLoading,
  hasError,
  loadData,
}) => (
  <div className={styles.root}>
    <button
      disabled={isLoading}
      onClick={() => {
        void loadData();
      }}
    >
      {isLoading ? "Loading..." : "Load more"}
    </button>
    {hasError && <div>Something went wrong. Please try again.</div>}
  </div>
);
