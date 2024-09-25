import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter = () => {
  const auth = "not-authenticated";
  if (auth === "not-authenticated") return <Outlet />;
  else return <Navigate to={"/calendar"} />;
};

export default ProtectedRouter;
