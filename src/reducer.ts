export type StateType = {
  name: string;
  phoneNumber: string;
  email: string;
  message: string;
  files: FileList | null;
};

export const initialState: StateType = {
  name: "",
  phoneNumber: "",
  email: "",
  message: "",
  files: null,
};

type ActionType = {
  type: keyof StateType | "reset";
  payload: { value: string | number | FileList | null };
};

export const reducer = (prevState: StateType, args: ActionType) => {
  const {
    type,
    payload: { value },
  } = args;
  if (type === "reset") {
    return initialState;
  }
  const newState = {
    ...prevState,
    [type]: value,
  };
  return newState;
};
