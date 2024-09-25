import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { STATEAUTHSELECTOR } from "../../store/slices/authSlice";

const ProtectedRouter = () => {
  const state = useAppSelector(STATEAUTHSELECTOR);
  if (state === "authenticated") return <Outlet />;
  else return <Navigate to={"/"} />;
};

export default ProtectedRouter;
