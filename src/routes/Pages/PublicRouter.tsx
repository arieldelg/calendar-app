import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { STATEAUTHSELECTOR } from "../../store/slices/authSlice";
import useCheckJWT from "../../hooks/useCheckJWT";
import { useEffect } from "react";

const PublicRouter = () => {
  const status = useAppSelector(STATEAUTHSELECTOR);
  const { startRenew } = useCheckJWT();
  useEffect(() => {
    startRenew();
  }, [startRenew]);
  if (status === "authenticated") return <Navigate to={"/calendar"} />;
  else return <Outlet />;
};

export default PublicRouter;
