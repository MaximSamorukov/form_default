import React, { useState } from "react";
import { Text, TextField } from "@radix-ui/themes";
import s from "./style.module.scss";
import type { StateType } from "../../reducer";
import { useValidate } from "../../hooks";

const labels = {
  REQUIRED: "Обязательно для заполнения",
  VALIDATION: "Содержание поля не валидно",
};

type InputFieldProps = {
  placeholder: string;
  required: boolean;
  type: keyof StateType;
  handleInput: (type: keyof StateType, arg: string | number) => void;
  value: string;
  handleValidation: (type: keyof StateType, v: boolean) => void;
};

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  required,
  type,
  handleInput,
  value,
  handleValidation,
}) => {
  const [error, setError] = useState<false | "REQUIRED" | "VALIDATION">(false);
  const { valid, validate } = useValidate(type);

  const label = required ? "*" + " " + placeholder : placeholder;
  const onInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    handleInput(type, value);
    validate(value);
  };
  const handleFocus = () => {
    setError(false);
  };

  const handleBlur = () => {
    if (required && !value) {
      setError("REQUIRED");
      handleValidation(type, false);
      return;
    }
    if ((required && value && !valid) || (!required && !valid)) {
      setError("VALIDATION");
      handleValidation(type, false);
      return;
    }
    setError(false);
    handleValidation(type, true);
    return;
  };

  return (
    <div className={s.container}>
      <TextField.Root
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onInput}
        className={s.input}
        size={"3"}
        variant="soft"
        placeholder={label}
      />
      <div className={s.textContainer}>
        {!!error && (
          <Text className={s.text} color="red">
            {labels[error]}
          </Text>
        )}
      </div>
    </div>
  );
};
