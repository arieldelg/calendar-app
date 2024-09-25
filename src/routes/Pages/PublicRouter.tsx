import { Navigate, Outlet } from "react-router-dom";

const PublicRouter = () => {
  const auth = "not-authenticated";
  if (auth === "not-authenticated") return <Navigate to={"/auth"} />;
  else return <Outlet />;
};

export default PublicRouter;
