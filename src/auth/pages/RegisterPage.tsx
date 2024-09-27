import { NavLink } from "react-router-dom";
import { Layout } from "./index";
import { FormEvent, useEffect } from "react";

import { useValidateForm } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { startRegisterUser } from "../../store/authThunk/thunks";
import { VariablesAuth } from "../../Types";
import { ERRORESPONSEAUTH, responseError } from "../../store/slices/authSlice";
// import { useAppDispatch } from "../../store/hooks";

// interface ResponseAction {
//   error: boolean;
//   errorMessage: string | undefined;
//   data: {
//     message: string;
//     ok: boolean;
//     token: string;
//     user: {
//       insertedId: string;
//     };
//   };
// }

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const errorResponse = useAppSelector(ERRORESPONSEAUTH);
  //* custom hook to validate form data
  const { handleErrors, errors, validateFormData } = useValidateForm();

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = validateFormData(e);
    if (!values) return;
    dispatch(startRegisterUser(values));
  };

  useEffect(() => {
    dispatch(responseError(undefined));
  }, [dispatch]);

  return (
    <Layout>
      <h1 className="authTitle">Register</h1>

      {errorResponse ? (
        <p className="text-red-500 text-center text-lg font-mono font-bold">
          {errorResponse}
        </p>
      ) : null}

      <form
        className="flex flex-col justify-center w-4/5"
        onSubmit={handleForm}
      >
        <div className="w-full h-24 ">
          <label htmlFor="name" className="label">
            User Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="name"
            onChange={(e) => handleErrors(VariablesAuth.NAME, e.target.value)}
            className={`authInput ${
              errors?.name ? "ring-2 ring-red-500" : null
            }`}
          />

          {errors.name ? (
            <p className="text-red-500 text-sm pt-1">{errors?.name}</p>
          ) : null}
        </div>
        <div className="w-full h-24">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="email@example.com"
            onChange={(e) => handleErrors(VariablesAuth.EMAIL, e.target.value)}
            className={`authInput ${
              errors?.email ? "ring-2 ring-red-500" : null
            }`}
          />
          {errors?.email ? (
            <p className="text-red-500 text-sm pt-1">{errors.email}</p>
          ) : null}
        </div>
        <div className="w-full h-24">
          <label htmlFor="password" className="label">
            Enter Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) =>
              handleErrors(VariablesAuth.PASSWORD, e.target.value)
            }
            className={`authInput ${
              errors?.password ? "ring-2 ring-red-500" : null
            }`}
            autoComplete="off"
          />
          {errors?.password ? (
            <p className="text-red-500 text-sm pt-1">{errors.password}</p>
          ) : null}
        </div>
        {
          //? is it necesary an input to confirm password
        }
        {/* <div className="w-full h-24">
          <label htmlFor="confirmPassword" className="label">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            onChange={(e) => handleErrors('confirmPassword', e.target.value)}
            className={`authInput ${errors.confirmPassword ? 'ring-2 ring-red-500' : null}`}
            autoComplete="off"
          />
          {errors?.confirmPassword ? <p className="text-red-500 text-sm pt-1">{errors.confirmPassword}</p>: null}

        </div> */}
        <hr className="border-black/20 w-full mt-2" />
        <div className="flex flex-col md:flex-row justify-between items-center w-full h-30 md:space-x-4 md:space-y-0 space-y-6 mt-8 mb-4">
          <button
            className="w-full md:w-1/2 h-10 rounded-full bg-green-300  ring-1 ring-green-500 hover:bg-green-400 hover:ring-offset-green-600 hover:ring-offset-2 text-xl text-black/50 font-semibold hover:text-black place-content-center text-center"
            type="submit"
          >
            Register
          </button>
          <NavLink to={"/auth/login"} className="w-full md:w-1/2 redButton">
            Cancel
          </NavLink>
        </div>
      </form>
    </Layout>
  );
};

export default RegisterPage;
