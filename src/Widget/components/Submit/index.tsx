import React from "react";
import { Button, Text } from "@radix-ui/themes";
import s from "./style.module.scss";

type SubmitProps = {
  handleSubmit: () => void;
  disabled: boolean;
  showPolicy: () => void;
};

export const SubmitButton: React.FC<SubmitProps> = ({
  disabled,
  handleSubmit,
  showPolicy,
}) => {
  return (
    <div className={s.container}>
      <div className={s.submitContainer}>
        <Button disabled={disabled} onClick={handleSubmit} className={s.submit}>
          Отправить
        </Button>
      </div>
      <Text className={s.text} color="gray">
        Нажимая на кнопку «Отправить», Вы принимаете условия{" "}
        <button className={s.btnPolicy} onClick={showPolicy}>
          политики конфиденциальности
        </button>{" "}
        в отношении обработки персональных данных.
      </Text>
    </div>
  );
};
