import PropTypes from "prop-types";

import styles from "./formSection.module.css";

const FormSection = ({ children, sectionTitle }) => {
  return (
    <fieldset className={styles["fieldset"]}>
      <legend className="visuallyHidden">{sectionTitle}</legend>
      {children}
    </fieldset>
  );
};

FormSection.propTypes = {
  children: PropTypes.node.isRequired,
  sectionTitle: PropTypes.string.isRequired,
};

export default FormSection;
