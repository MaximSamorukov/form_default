import React from "react";
import { Text, TextField } from "@radix-ui/themes";
import s from "./style.module.scss";

type InputFieldProps = {
  placeholder: string;
  required: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  required,
}) => {
  const label = required ? "*" + " " + placeholder : placeholder;

  return (
    <div className={s.container}>
      <TextField.Root
        className={s.input}
        size={"3"}
        variant="soft"
        placeholder={label}
      />
      <div className={s.textContainer}>
        {required && (
          <Text className={s.text} color="red">
            Обязательно для запонения
          </Text>
        )}
      </div>
    </div>
  );
};
