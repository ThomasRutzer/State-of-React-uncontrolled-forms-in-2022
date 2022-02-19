import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Form = ({ children, onSubmit, action, method = "post", className }) => {
  const formRef = useRef();

  const focusFirstRelevantFormField = () => {
    for (let i = 0; i < formRef.current.elements.length; i++) {
      if (!formRef.current.elements[i].validity.valid) {
        formRef.current.elements[i].focus();
        break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allFieldsValid = formRef.current.checkValidity();

    if (!allFieldsValid) {
      // for a11y and ux concerns, its helpful to focus first invalid
      // form element when submitting fails due to invalidity
      focusFirstRelevantFormField();
    } else {
      onSubmit(e);
    }
  };

  useEffect(() => {
    formRef.current.setAttribute("novalidate", true);
    focusFirstRelevantFormField();
  }, []);

  return (
    <form
      className={className}
      ref={formRef}
      onSubmit={handleSubmit}
      method={method}
      action={action}
    >
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  action: PropTypes.string,
  method: PropTypes.string,
  className: PropTypes.string,
};

export default Form;
