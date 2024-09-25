import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Root } from "./routes";
import { ProtectedRouter, PublicRouter } from "./routes/Pages";
import { CalendarApp } from "./calendar/pages";
import { saveUpdateNote } from "./routes/actions";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { LoginPage, RegisterPage } from "./auth/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <ProtectedRouter />,
        children: [
          {
            path: "auth",
            children: [
              {
                index: true,
                element: <Navigate to={"login"} />,
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
      {
        element: <PublicRouter />,
        children: [
          {
            path: "/calendar",
            element: <CalendarApp />,
            action: saveUpdateNote,
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
