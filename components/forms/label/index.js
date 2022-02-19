import PropTypes from "prop-types";

import styles from "./label.module.css";

const Label = ({ children, formFieldId, asRequired }) => {
  return (
    <label className={styles["label"]} htmlFor={formFieldId}>
      {children}
      {asRequired ? "*" : null}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  formFieldId: PropTypes.string.isRequired,
  asRequired: PropTypes.bool,
};

export default Label;
