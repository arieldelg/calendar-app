import { AxiosResponse } from "axios";
import { calendarApi } from "../../api";
import { RegisterCredentials } from "../../Types";
import { checking, onLogin, responseError } from "../slices/authSlice";

export const startRegisterUser = (userData: RegisterCredentials) => {
  return async (
    dispatch: (arg0: {
      payload: string | undefined | { _uid: string; name: string };
      type: "auth/checking" | "auth/responseError" | "auth/onLogin";
    }) => void
  ) => {
    dispatch(checking());
    try {
      const response = await calendarApi.post("/auth/new", userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("token-time", JSON.stringify(new Date().getTime()));
      dispatch(onLogin(response.data.user));
    } catch (error) {
      const { response } = error as { response: AxiosResponse };
      dispatch(responseError(response.data.message));
    }
  };
};

export const startLoginUser = (userData: RegisterCredentials) => {
  return async (
    dispatch: (arg0: {
      payload: undefined | { name: string; _uid: string } | string;
      type: "auth/checking" | "auth/onLogin" | "auth/responseError";
    }) => void
  ) => {
    dispatch(checking());

    try {
      const response = await calendarApi.post("/auth", userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("token-time", JSON.stringify(new Date().getTime()));
      dispatch(onLogin(response.data.user));
    } catch (error) {
      const { response } = error as { response: AxiosResponse };
      dispatch(responseError(response.data.message));
    }
  };
};
