import React from "react";
import { Button, Heading, Text } from "@radix-ui/themes";
import { CloseIcon } from "../Close";
import s from "./style.module.scss";

type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className={s.header}>
      <div className={s.labels}>
        <Heading>{title}</Heading>
        <Text style={{ fontSize: 14 }}>*обязательно для заполнения</Text>
      </div>
      <div className={s.controls}>
        <Button variant="surface">
          <CloseIcon />
        </Button>
      </div>
    </div>
  );
};
