import "./App.scss";
import s from "./App.module.scss";
import { Card, Flex } from "@radix-ui/themes";
import { Header } from "./components/Header";
import { InputField } from "./components/InputField";
import { FileUpload } from "./components/FileUpload";
import { SubmitButton } from "./components/Submit";
import { Footer } from "./components/Footer";
import { useReducer } from "react";
import { initialState, reducer, type StateType } from "./reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = () => {
    console.log(state);
  };

  const onInput = (type: keyof StateType, value: string | number | Blob) => {
    dispatch({ type, payload: { value } });
  };
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
          <InputField
            value={state["name"]}
            handleInput={onInput}
            type="name"
            required
            placeholder="Ваше имя"
          />
          <InputField
            value={state["phoneNumber"]}
            handleInput={onInput}
            type="phoneNumber"
            required
            placeholder="Телефон"
          />
          <InputField
            value={state["email"]}
            handleInput={onInput}
            type="email"
            required={false}
            placeholder="E-mail"
          />
          <InputField
            value={state["message"]}
            handleInput={onInput}
            type="message"
            required={false}
            placeholder="Сообщение"
          />
        </Flex>
        <FileUpload />
        <SubmitButton handleSubmit={handleSubmit} />
        <Footer />
      </Flex>
    </Card>
  );
}

export default App;
