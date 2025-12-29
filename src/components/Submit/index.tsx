import React from "react";
import { Button, Link, Text } from "@radix-ui/themes";
import s from "./style.module.scss";

type SubmitProps = {
  handleSubmit: () => void;
};

export const SubmitButton: React.FC<SubmitProps> = ({ handleSubmit }) => {
  return (
    <div className={s.container}>
      <Text className={s.text} color="gray">
        Нажимая на кнопку «Отправить», Вы принимаете условия{" "}
        <Link href="#">политики конфиденциальности</Link> в отношении обработки
        персональных данных.
      </Text>
      <div className={s.submitContainer}>
        <Button onClick={handleSubmit} className={s.submit}>
          Отправить
        </Button>
      </div>
    </div>
  );
};
