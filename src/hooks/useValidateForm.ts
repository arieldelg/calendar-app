import { FormEvent, useMemo, useState } from "react";
import { RegisterCredentials, VariablesAuth } from "../Types";

interface TestingType {
  [key: string]: string | undefined;
}

const useValidateForm = () => {
  const [submit, setSubmit] = useState<boolean>(false);

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const isFormValid = useMemo(() => {
    if (Object.keys(errors).length !== 0) return false;
    return true;
  }, [errors]);

  const validateFormData = (e: FormEvent<HTMLFormElement>) => {
    setSubmit(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const values = Object.fromEntries(formData) as unknown as TestingType;

    const arrayValue: boolean[] = [];
    for (const value of Object.keys(values)) {
      const statusError = handleErrorsSubmit(value, values[value] as string);
      arrayValue.push(statusError);
    }

    const validForm = arrayValue.every((value) => value === false);
    if (!validForm) return;

    return values as unknown as RegisterCredentials;
  };

  const handleErrors = (key: string, value: string) => {
    if (!submit) return;
    handleErrorsSubmit(key, value);
  };

  const handleErrorsSubmit = (key: string, value: string) => {
    let statusError: boolean = true;
    switch (key) {
      case VariablesAuth.NAME:
        return (statusError = evaluateUserName(key, value));

      case VariablesAuth.EMAIL:
        return (statusError = evaluateEmail(key, value));

      case "confirmPassword":
      case VariablesAuth.PASSWORD:
        return (statusError = evaluatePassword(key, value));

      default:
        break;
    }

    return statusError;
  };

  const evaluateUserName = (key: string, value: string) => {
    let status: boolean = false;
    if (value.length === 0) {
      setErrors((prev) => ({
        ...prev,
        [key]: "user is required",
      }));
      return (status = true);
    }
    if (value.length < 4) {
      setErrors((prev) => ({
        ...prev,
        [key]: "user name needs to be at least 4 characters",
      }));
      return (status = true);
    }

    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
    return status;
  };

  const evaluateEmail = (key: string, value: string) => {
    let status: boolean = false;
    if (value.length === 0) {
      setErrors((prev) => ({
        ...prev,
        [key]: "email required",
      }));
      return (status = true);
    }

    if (!value.includes("@")) {
      setErrors((prev) => ({
        ...prev,
        [key]: "email invalid",
      }));
      return (status = true);
    }

    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
    return status;
  };

  const evaluatePassword = (key: string, value: string) => {
    let status: boolean = false;
    if (value.length === 0) {
      setErrors((prev) => ({
        ...prev,
        [key]: "password required",
      }));
      return (status = true);
    }

    if (value.length < 8) {
      setErrors((prev) => ({
        ...prev,
        [key]: "password needs to be at least 8 characters",
      }));
      return (status = true);
    }

    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
    return status;
  };

  return {
    // validate form when submit
    validateFormData,

    // states
    errors,
    isFormValid,
    //methods
    handleErrors,
    // values: getValues(),
  };
};

export default useValidateForm;
