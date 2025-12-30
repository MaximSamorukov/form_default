import { useCallback, useState } from "react";
import type { StateType } from "./reducer";
const PATTERNS = {
  name: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
  phoneNumber: /^(7|8)\d{10}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};
export const useValidate = (type: keyof StateType) => {
  const [valid, setValid] = useState(true);
  const validate = useCallback(
    (value: string | number) => {
      const stringValue = String(value);
      if (!stringValue) {
        setValid(true);
        return;
      }
      switch (type) {
        case "name":
          setValid(PATTERNS.name.test(stringValue));
          break;
        case "phoneNumber":
          setValid(PATTERNS.phoneNumber.test(stringValue));
          break;
        case "email":
          setValid(PATTERNS.email.test(stringValue));
          break;
        case "message":
        default:
          setValid(true);
          break;
      }
    },
    [type]
  );

  return {
    valid,
    validate,
  };
};
