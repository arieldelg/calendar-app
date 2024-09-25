import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { STATEAUTHSELECTOR } from "../../store/slices/authSlice";

const PublicRouter = () => {
  const status = useAppSelector(STATEAUTHSELECTOR);
  if (status === "authenticated") return <Navigate to={"/calendar"} />;
  else return <Outlet />;
};

export default PublicRouter;
