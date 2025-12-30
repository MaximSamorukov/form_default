import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@radix-ui/themes";
import s from "./style.module.scss";

type ModalProps = {
  open: boolean;
  text: string;
  onOpenModalChange: (v: boolean) => void;
};

export const Modal: React.FC<ModalProps> = ({
  open,
  text,
  onOpenModalChange,
}) => {
  const onClose = () => onOpenModalChange(false);
  return (
    <Dialog.Root open={open} modal onOpenChange={onOpenModalChange}>
      <Dialog.Overlay className={s.overlay} />
      <Dialog.Content className={s.content}>
        <div className={s.textContainer}>{text}</div>
        <div className={s.closeButtonContainer}>
          <Dialog.Close asChild>
            <Button className={s.closeButton} onClick={onClose}>
              Закрыть
            </Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
