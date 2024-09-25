import {
  Form,
  // Navigate,
  NavLink,
  useActionData,
} from "react-router-dom";
// import { FormEvent } from "react";
// import { ErrorLayout } from "../components";
// import { formValidation } from "../../helpers";
// import {
//   useAppDispatch,
//   //  useAppSelector
// } from "../../store/hooks";
import { Layout } from "./index";
// import { formValidation } from "../../hooks";

// interface DataType {
//   email: string;
//   userName: string;
//   password: string;
// }

interface ErrorAuth {
  error: boolean;
  errorMessage: string;
}

const RegisterPage = () => {
  const error = useActionData() as ErrorAuth;
  // use dispatch and selector typed
  // const dispatch = useAppDispatch();
  // const error = useAppSelector((state) => state.auth.errorMessage);
  // const ok = useAppSelector((state) => state.auth.ok);

  // function that handles formData
  // const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
  //   // const data = formValidation(e) as unknown as DataType;
  //   // dispatch(startRegisterCredentials(data, e));

  //   // console.log(ok);
  // };

  // if (ok) {
  //   console.log(ok);
  //   return <Navigate to={"/auth/login"} />;
  // }

  return (
    <Layout>
      <h1 className="authTitle">Register</h1>

      {error?.error ? (
        <p className="text-red-600 font-mono font-bold text-lg tracking-tighter">
          {error.errorMessage}
        </p>
      ) : null}

      <Form
        method="post"
        className="flex flex-col justify-center w-4/5 space-y-7"
        // onSubmit={(e) => handleSumbit(e)}
        name="register"
      >
        <div className="w-full">
          <label htmlFor="userName" className="label">
            User Name
          </label>
          <input
            id="userName"
            type="text"
            name="userName"
            placeholder="username"
            className="authInput"
          />
        </div>
        <div className="w-full">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="email@example.com"
            className="authInput"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="label">
            Enter Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            className="authInput"
            autoComplete="off"
          />
        </div>
        <div className="w-full">
          <label htmlFor="confirmPassword" className="label">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            className="authInput"
            autoComplete="off"
          />
        </div>
        <hr className="border-black/20 w-full" />
        <div className="flex flex-col md:flex-row justify-between items-center w-full h-30 md:space-x-4 md:space-y-0 space-y-6">
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
      </Form>
    </Layout>
  );
};

export default RegisterPage;
