import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { STATEAUTHSELECTOR } from "../../store/slices/authSlice";
import useCheckJWT from "../../hooks/useCheckJWT";
import { useEffect } from "react";

const ProtectedRouter = () => {
  const { startRenew } = useCheckJWT();
  const state = useAppSelector(STATEAUTHSELECTOR);
  useEffect(() => {
    startRenew();
  }, [startRenew]);
  if (state === "checking") return <p>Cargando...</p>;
  if (state === "authenticated") return <Outlet />;
  else return <Navigate to={"/"} />;
};

export default ProtectedRouter;
