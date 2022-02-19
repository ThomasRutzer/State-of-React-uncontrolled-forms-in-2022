import PropTypes from "prop-types";
import React from "react";

import styles from "./errorMessage.module.css";

const ErrorMessage = ({ children, describes }) => {
  return (
    <span className={styles["container"]} id={describes}>
      {React.Children.map(children, (message, key) => (
        <span key={key} className={styles["message"]}>
          Error: {message}
        </span>
      ))}
    </span>
  );
};

ErrorMessage.propTypes = {
  describes: PropTypes.string.isRequired,
};

export default ErrorMessage;
