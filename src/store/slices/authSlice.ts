import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AUTHSTORE {
  status: "checking" | "authenticated" | "unAuthenticated";
  user: USER | undefined;
  errorMessage: undefined | string;
}

export interface USER {
  name: string;
  _uid: string;
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
    saveUser: (state, action: PayloadAction<USER>) => {
      state.user = action.payload;
    },
    responseError: (state, action: PayloadAction<string | undefined>) => {
      state.errorMessage = action.payload;
      state.status = "unAuthenticated";
    },
    onLogout: (state) => {
      state.status = "unAuthenticated";
      state.errorMessage = undefined;
      state.user = undefined;
    },
  },
});

/*!exportamos las acciones del slice*/
export const { checking, onLogin, responseError, onLogout } = authSlice.actions;

/* ! esto lo qu exportamos al store*/
export default authSlice.reducer;

const STATEAUTH = (state: RootState) => state;
const ERRORRESPONSE = (state: RootState) => state;

export const STATEAUTHSELECTOR = createSelector(
  [STATEAUTH],
  (STATEAUTH) => STATEAUTH.auth.status
);

export const ERRORESPONSEAUTH = createSelector(
  [ERRORRESPONSE],
  (ERRORRESPONSE) => ERRORRESPONSE.auth.errorMessage
);
