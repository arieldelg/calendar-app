import { calendarApi } from "../api";
import { useAppDispatch } from "../store/hooks";
import { onLogin, onLogout } from "../store/slices/authSlice";

const useCheckJWT = () => {
  const dispatch = useAppDispatch();
  const startRenew = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());
    try {
      const { data } = await calendarApi("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-time", JSON.stringify(new Date().getTime()));
      dispatch(onLogin(data.user));
    } catch (error) {
      console.log(error);
      dispatch(onLogout());
    }
  };

  return {
    startRenew,
  };
};

export default useCheckJWT;
