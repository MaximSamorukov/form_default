import React from "react";
import { Card, Text } from "@radix-ui/themes";
import s from "./style.module.scss";
import { ArrowUpFromLine } from "lucide-react";

type FileUploadProps = {};

export const FileUpload: React.FC<FileUploadProps> = () => {
  return (
    <div className={s.container}>
      <Card variant="surface" className={s.uploadContainer}>
        <button className={s.upload}>
          <ArrowUpFromLine />
        </button>
      </Card>
      <Text className={s.text}>Прикрепите до 6 файлов</Text>
    </div>
  );
};
