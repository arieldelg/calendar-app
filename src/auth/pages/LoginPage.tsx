import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { NavLink } from "react-router-dom";
import { Layout } from "./index";
import { FormEvent, useEffect } from "react";
import { useValidateForm } from "../../hooks";
import { startLoginUser } from "../../store/authThunk/thunks";
import { ERRORESPONSEAUTH, responseError } from "../../store/slices/authSlice";

// function component starts here
const LoginPage = () => {
  const dispatch = useAppDispatch();
  const errorResponse = useAppSelector(ERRORESPONSEAUTH);
  const status = useAppSelector((state) => state.auth.status);

  const { validateFormData, errors, handleErrors } = useValidateForm();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = validateFormData(e);
    if (!values) return;
    dispatch(startLoginUser(values));
  };

  useEffect(() => {
    dispatch(responseError(undefined));
  }, [dispatch]);

  return (
    <Layout>
      <h1 className="authTitle">Login</h1>

      {errorResponse ? (
        <p className="text-center text-red-500 text-lg font-bold font-mono">
          {errorResponse}
        </p>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-4/5 space-y-4"
      >
        <div className="w-full h-24 flex flex-col">
          <label htmlFor="email" className="label">
            Enter email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="email@example.com"
            className={`authInput ${
              errors?.email ? "ring-2 ring-red-500" : null
            }`}
            autoComplete="email"
            onChange={(e) => handleErrors("email", e.target.value)}
          />
          {errors?.email ? (
            <p className="text-sm text-red-500 pt-1">{errors.email}</p>
          ) : null}
        </div>
        <div className="w-full h-24 flex flex-col">
          <label htmlFor="password" className="label">
            Enter password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            className={`authInput ${
              errors?.password ? "ring-2 ring-red-500" : null
            }`}
            autoComplete="off"
            onChange={(e) => handleErrors("password", e.target.value)}
          />
          {errors?.password ? (
            <p className="text-sm text-red-500 pt-1">{errors.password}</p>
          ) : null}
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
        <button type="submit" className="w-full greenButton">
          Login
        </button>
      </form>

      <hr className=" border-black/20 w-full" />

      <p>Or</p>

      <NavLink
        to={"/auth/register"}
        // onClick={() => {
        //   dispatch(resetingOk());
        // }}
        className="bg-blue-300 w-4/5  h-10  rounded-full ring-1 ring-blue-500 hover:bg-blue-400 hover:ring-offset-2 ring-offset-blue-600 text-xl text-black/50 font-semibold hover:text-black place-content-center text-center"
      >
        <button>Register</button>
      </NavLink>
      <NavLink to={"/"} className="redButton w-4/5">
        <button className="w-full h-full">Cancel</button>
      </NavLink>
    </Layout>
  );
};

export default LoginPage;
