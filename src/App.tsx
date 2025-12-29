import { useCallback, useReducer, useState } from "react";
import "./App.scss";
import { Card, Flex } from "@radix-ui/themes";
import { Header } from "./components/Header";
import { InputField } from "./components/InputField";
import { FileUpload } from "./components/FileUpload";
import { SubmitButton } from "./components/Submit";
import { Footer } from "./components/Footer";
import { initialState, reducer, type StateType } from "./reducer";
import s from "./App.module.scss";
import { Policy } from "./components/Policy";

function App() {
  const [showPolicy, setShowPolicy] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formValid, setFormValid] = useState({
    name: true,
    phoneNumber: true,
    email: true,
    message: true,
    files: true,
  });
  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("name", state.name);
    formData.append("phoneNumber", state.phoneNumber);
    formData.append("email", state.email);
    formData.append("message", state.message);

    if (state.files) {
      Array.from(state.files).forEach((file) => {
        formData.append("files", file);
      });
    }
    console.log(formData);
  };

  const handleFormValidation = useCallback(
    (type: keyof StateType, v: boolean) => {
      setFormValid((prev) => ({
        ...prev,
        [type]: v,
      }));
    },
    []
  );
  const submitBtnDisabled = !!Object.values(formValid).filter((v) => !v).length;

  const onInput = (
    type: keyof StateType,
    value: string | number | FileList | null
  ) => {
    dispatch({ type, payload: { value } });
  };
  const handleBack = useCallback(() => setShowPolicy(false), []);
  const handleShowPolicy = useCallback(() => setShowPolicy(true), []);
  return (
    <Card className={s.container} variant="surface" size={"2"}>
      {showPolicy ? (
        <Policy onBack={handleBack} />
      ) : (
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
              handleValidation={handleFormValidation}
              value={state["name"]}
              handleInput={onInput}
              type="name"
              required
              placeholder="Ваше имя"
            />
            <InputField
              handleValidation={handleFormValidation}
              value={state["phoneNumber"]}
              handleInput={onInput}
              type="phoneNumber"
              required
              placeholder="Телефон"
            />
            <InputField
              handleValidation={handleFormValidation}
              value={state["email"]}
              handleInput={onInput}
              type="email"
              required={false}
              placeholder="E-mail"
            />
            <InputField
              handleValidation={handleFormValidation}
              value={state["message"]}
              handleInput={onInput}
              type="message"
              required={false}
              placeholder="Сообщение"
            />
          </Flex>
          <FileUpload handleInput={onInput} />
          <SubmitButton
            showPolicy={handleShowPolicy}
            disabled={submitBtnDisabled}
            handleSubmit={handleSubmit}
          />
          <Footer />
        </Flex>
      )}
    </Card>
  );
}

export default App;
