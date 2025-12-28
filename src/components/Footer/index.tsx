import React from "react";
import { Text } from "@radix-ui/themes";
import s from "./style.module.scss";
import { PhoneOutgoing } from "lucide-react";

type SubmitProps = {};

export const Footer: React.FC<SubmitProps> = () => {
  return (
    <div className={s.container}>
      <div className={s.icon}>
        <PhoneOutgoing size={26} />
      </div>
      <Text className={s.text} color="gray">
        Или обратитесь к нам по телефону: +7 (495) 308-05-21 (Москва)
      </Text>
    </div>
  );
};
