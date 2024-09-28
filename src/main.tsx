import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes";
import { ProtectedRouter, PublicRouter } from "./routes/Pages";
import { CalendarApp } from "./calendar/pages";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { LoginPage, RegisterPage } from "./auth/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <p>Home</p>,
      },
      {
        element: <ProtectedRouter />,
        children: [
          {
            path: "/calendar",
            element: <CalendarApp />,
          },
        ],
      },
    ],
  },
  {
    element: <PublicRouter />,
    children: [
      {
        path: "auth",
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
