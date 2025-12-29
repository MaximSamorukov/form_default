export type StateType = {
  name: string;
  phoneNumber: string;
  email: string;
  message: string;
  files: Blob[];
};

export const initialState: StateType = {
  name: "",
  phoneNumber: "",
  email: "",
  message: "",
  files: [],
};

type ActionType = {
  type: keyof StateType;
  payload: { value: string | number | Blob };
};

export const reducer = (prevState: StateType, args: ActionType) => {
  const {
    type,
    payload: { value },
  } = args;
  const newState = {
    ...prevState,
    [type]: value,
  };
  return newState;
};
