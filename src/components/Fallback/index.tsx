import s from "./style.module.scss";
import { Spinner } from "@radix-ui/themes";

export const Fallback = () => {
  return (
    <div className={s.container}>
      <Spinner />
    </div>
  );
};
