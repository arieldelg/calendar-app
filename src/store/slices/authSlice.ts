import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AUTHSTORE {
  status: "checking" | "authenticated";
  user: USER | undefined;
  errorMessage: undefined;
}

interface USER {
  name: string;
  _uid: string;
  token: string;
}

/*!initialState*/
const initialState: AUTHSTORE = {
  status: "checking",
  user: undefined,
  errorMessage: undefined,
};

/*!slice*/
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checking: (state) => {
      state.status = "checking";
      state.user = undefined;
      state.errorMessage = undefined;
    },
    onLogin: (state, action: PayloadAction<USER>) => {
      state.status = "authenticated";
      state.user = action.payload;
      state.errorMessage = undefined;
    },
  },
});

/*!exportamos las acciones del slice*/
export const { checking, onLogin } = authSlice.actions;

/* ! esto lo qu exportamos al store*/
export default authSlice.reducer;

const STATEAUTH = (state: RootState) => state;

export const STATEAUTHSELECTOR = createSelector(
  [STATEAUTH],
  (STATEAUTH) => STATEAUTH.auth.status
);
