import { useCallback, useReducer, useState, lazy, Suspense } from "react";
import "./App.scss";
import { Card, Flex } from "@radix-ui/themes";
import { Header } from "./components/Header";
import { InputField } from "./components/InputField";
import { FileUpload } from "./components/FileUpload";
import { SubmitButton } from "./components/Submit";
import { Footer } from "./components/Footer";
import { initialState, reducer, type StateType } from "./reducer";
import s from "./App.module.scss";
import { Fallback } from "./components/Fallback";
import { Modal } from "./components/Modal";
const Policy = lazy(() => import("./components/Policy"));

const successMessage = "Заявка отправлена. Менеджер свяжется с вами.";
const errorMessage = "Ошибка отправки заявки";

function App() {
  const [showPolicy, setShowPolicy] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formValid, setFormValid] = useState({
    name: true,
    phoneNumber: true,
    email: true,
    message: true,
    files: true,
  });
  const resetForm = () => {
    dispatch({ type: "reset", payload: { value: null } });
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", state.name);
    formData.append("phoneNumber", state.phoneNumber);
    formData.append("email", state.email);
    formData.append("message", state.message);

    if (state.files) {
      Array.from(state.files).forEach((file) => {
        formData.append(`files`, file);
      });
    }
    const url = true
      ? "https://next-default-widget-server.vercel.app/api/lead/telegram"
      : "http://localhost:3000/api/lead/telegram";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitError(false);
        resetForm();
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      setSubmitError(true);
      console.error("Submission error:", error);
    } finally {
      setShowModal(true);
    }
  };
  const onOpenModalChange = useCallback((s: boolean) => {
    setShowModal(s);
  }, []);
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
  const modalText = submitError ? errorMessage : successMessage;
  return (
    <Card className={s.container} variant="surface" size={"2"}>
      <Modal
        open={showModal}
        text={modalText}
        onOpenModalChange={onOpenModalChange}
      />
      {showPolicy ? (
        <Suspense fallback={<Fallback />}>
          <Policy onBack={handleBack} />
        </Suspense>
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
          <FileUpload handleInput={onInput} files={state.files} />
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
