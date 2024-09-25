import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Navigate, NavLink } from "react-router-dom";
// import { formValidation } from "../../helpers";
import { Layout } from "./index";
// import {
//   checkingAuthentication,
//   startGoogleSignIn,
// } from "../../store/auth/thunk";
// import { ErrorLayout } from "../components";
// import { resetingOk } from "../../store/auth/authSlice";

interface DataType {
  email: string;
  userName?: string;
  password: string;
}

// function component starts here
const LoginPage = () => {
  // typed dispatch imported from sotre/auth/store.ts
  const dispatch = useAppDispatch();

  // typed state imported from store/auth/store.ts
  const error = useAppSelector((state) => state.auth.errorMessage);
  const status = useAppSelector((state) => state.auth.status);

  //! handle funtion for login credentials
  const handleLoginCredentials = (e: FormEvent<HTMLFormElement>) => {
    const data = formValidation({ e }) as unknown as DataType;
    dispatch(checkingAuthentication(data, e));
  };

  //! handle funtion for login provider (google, facebook, twitter, etc..)
  const handleLoginProviders = () => {
    dispatch(startGoogleSignIn());
  };

  if (status === "authenticated") {
    return <Navigate to={"/journal"} />;
  }

  return (
    <Layout>
      <h1 className="authTitle">Login</h1>

      {error ? <ErrorLayout message={error} /> : null}

      <form
        name="loginCredentials"
        onSubmit={(e) => handleLoginCredentials(e)}
        className="flex flex-col items-center w-4/5 space-y-4"
      >
        <div className="w-full h-18 flex flex-col space-y-2">
          <label htmlFor="email" className="label">
            Enter email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="email@example.com"
            className="authInput"
            autoComplete="email"
          />
        </div>
        <div className="w-full h-18 flex flex-col space-y-2">
          <label htmlFor="password" className="label">
            Enter password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            className="authInput"
          />
        </div>
        <NavLink
          className="w-auto flex items-center justify-center"
          to={"/reset"}
        >
          <button
            className="w-auto"
            disabled={status === "checking" ? true : false}
          >
            <p className="text-sm text-blue-500 underline-offset-2 underline text-center">
              Olvide mi contraseña
            </p>
          </button>
        </NavLink>
        <button
          disabled={status === "checking" ? true : false}
          type="submit"
          className="w-full greenButton"
        >
          Login
        </button>
      </form>

      <form
        className="w-4/5"
        name="loginProvider"
        onSubmit={() => handleLoginProviders()}
      >
        <button
          disabled={status === "checking" ? true : false}
          type="submit"
          className="w-full h-10 rounded-full bg-orange-300 ring-1 ring-orange-500 hover:bg-orange-400 hover:ring-offset-orange-600 hover:ring-offset-2 text-xl text-black/50 font-semibold hover:text-black place-content-center text-center"
        >
          Google
        </button>
      </form>

      <hr className=" border-black/20 w-full" />

      <p>Or</p>

      <NavLink
        to={"/auth/register"}
        onClick={() => {
          dispatch(resetingOk());
        }}
        className="bg-blue-300 w-4/5  h-10  rounded-full ring-1 ring-blue-500 hover:bg-blue-400 hover:ring-offset-2 ring-offset-blue-600 text-xl text-black/50 font-semibold hover:text-black place-content-center text-center"
      >
        <button disabled={status === "checking" ? true : false}>
          Register
        </button>
      </NavLink>
    </Layout>
  );
};

export default LoginPage;
