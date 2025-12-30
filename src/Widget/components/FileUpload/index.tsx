import React, { useEffect, useRef, useState } from "react";
import { Card, Text } from "@radix-ui/themes";
import s from "./style.module.scss";
import { ArrowUpFromLine, FileText, X } from "lucide-react";
import type { StateType } from "../../reducer";

type FileUploadProps = {
  handleInput: (type: keyof StateType, arg: FileList | null) => void;
  files: FileList | null;
};
const MAX = 6;
export const FileUpload: React.FC<FileUploadProps> = ({
  files,
  handleInput,
}) => {
  const [fileItems, setFileItems] = useState<FileList | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const onUpload = () => {
    if (ref.current) {
      ref.current.click();
    }
  };
  useEffect(() => {
    setFileItems(files);
  }, [files]);
  const handleUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFileItems(e.target.files);
    handleInput("files", e.target.files);
  };
  const handleRemoveFiles = () => {
    setFileItems(null);
    handleInput("files", null);
  };
  return (
    <div className={s.container}>
      <Card variant="surface" className={s.uploadContainer}>
        <input
          disabled={(fileItems?.length || 0) >= MAX}
          onChange={handleUpload}
          ref={ref}
          style={{ display: "none" }}
          type="file"
          multiple
          max={6}
        />
        <button onClick={onUpload} className={s.upload}>
          <ArrowUpFromLine />
        </button>
      </Card>
      <div className={s.dataContainer}>
        <Text className={s.text}>Прикрепите до {MAX} файлов</Text>
        <div className={s.files}>
          {Array.from({ length: fileItems?.length || 0 }).map(() => (
            <FileText color="#5e5c64" />
          ))}
          {(fileItems?.length || 0) > 0 && (
            <button onClick={handleRemoveFiles} className={s.removeButton}>
              <X color="#e01b24" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
