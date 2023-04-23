import { atom } from "recoil";

type TUser = {
  id: string | null;
  name: string | null;
  email: string | null;
  user_type: string | null;
};

const initialValue: TUser = {
  id: null,
  email: null,
  name: null,
  user_type: null,
};

const userState = atom<TUser>({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: initialValue, // default value (aka initial value)
});

export default userState;
