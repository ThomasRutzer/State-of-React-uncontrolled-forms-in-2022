import { useEffect, useRef, useState } from "react";

import styles from "./passwordInput.module.css";
import TextInput from "../textInput";

const PasswordInput = ({ name, ...textInputProps }) => {
  const container = useRef();
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    // MS Edge shows a reveal control for password inputs. When JS is
    // available in the client, an additional style is added to hide it
    container.current.classList.add(styles["containerWithJS"]);
  }, []);

  return (
    <div ref={container} className={styles["container"]}>
      <TextInput
        type={hidePassword ? "password" : "text"}
        autoComplete="off"
        name={name}
        {...textInputProps}
      />
      <button
        className={styles["showControl"]}
        onClick={() => setHidePassword(!hidePassword)}
        type="button"
        aria-controls={name}
      >
        {hidePassword ? "show" : "hide"}
      </button>
      <span className="visuallyHidden" aria-live="polite">
        {hidePassword ? "Your password is hidden" : "Your password is shown"}
      </span>
    </div>
  );
};

export default PasswordInput;
