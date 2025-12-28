import "./App.scss";
import s from "./App.module.scss";
import { Card, Flex } from "@radix-ui/themes";
import { Header } from "./components/Header";
import { InputField } from "./components/InputField";
import { FileUpload } from "./components/FileUpload";
import { SubmitButton } from "./components/Submit";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Card className={s.container} variant="surface" size={"2"}>
      <Flex direction={"column"} align={"start"} justify={"start"} gap={"5"}>
        <Header title="Оставить заявку на расчет" />
        <Flex
          style={{ width: "100%" }}
          direction={"column"}
          align={"start"}
          justify={"start"}
          gap={"5"}
        >
          <InputField required placeholder="Ваше имя" />
          <InputField required placeholder="Телефон" />
          <InputField required={false} placeholder="E-mail" />
          <InputField required={false} placeholder="Сообщение" />
        </Flex>
        <FileUpload />
        <SubmitButton />
        <Footer />
      </Flex>
    </Card>
  );
}

export default App;
