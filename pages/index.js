import Head from "next/head";

import styles from "./testForm.module.css";
import config from "./config.json";
import {
  Form,
  FormSection,
  TextInput,
  PasswordInput,
  Checkbox,
} from "../components/forms";

export default function Signup() {
  const handleSubmit = (e) => {
    // this marks the end of the demo
    const formData = new FormData(e.target);
    outputFormData(formData);
  };

  return (
    <>
      <Head>
        <title>Welcome – Please sign-up</title>
      </Head>
      <div className={styles["container"]}>
        <h1>Welcome.</h1>
        <Form className={styles["form"]} onSubmit={handleSubmit}>
          <>
            {config.sections.map(({ fields }, sectionLoopKey) => (
              <FormSection key={sectionLoopKey} sectionTitle="Required fields">
                <>
                  {fields.map(
                    ({ name, label, component }, formFieldLoopKey) => {
                      const FormField = getFieldComponent(component);

                      if (FormField) {
                        return (
                          <FormField
                            key={`${sectionLoopKey}-${formFieldLoopKey}`}
                            formId="testForm"
                            name={name}
                            label={label}
                            validationProperties={
                              config.validation.schema.properties[name]
                            }
                            validationMessages={
                              config.validation.config.errMessages[name]
                            }
                          />
                        );
                      }
                      {
                        return null;
                      }
                    }
                  )}
                </>
              </FormSection>
            ))}
          </>
          <button className={styles["submit"]}>
            {config.submitButtonLabel}
          </button>
          <p className={styles["requiredNote"]}>* required fields</p>
        </Form>
      </div>
    </>
  );
}

function getFieldComponent(componentName) {
  switch (componentName) {
    case "TextInput":
      return TextInput;

    case "PasswordInput":
      return PasswordInput;

    case "Checkbox":
      return Checkbox;

    default:
      return null;
  }
}

// this function should be cleared before it is production-ready
function outputFormData(formData) {
  console.log(
    "%cThanks for submitting!",
    "color:transparent;font-family:system-ui;font-size:2rem;-webkit-text-stroke:1px white;font-weight:bold;font-style:italic;"
  );

  console.log(
    "%cWhat to do with the submitted data will be the next step 🙂 ! This is your submitted data: ",
    "color:;font-family:system-ui;font-size:1rem;"
  );

  for (const [key, value] of formData.entries()) {
    console.log(
      `%c${key}: ${value}`,
      "color:;font-family:system-ui;font-size:0.75rem;"
    );
  }
}
