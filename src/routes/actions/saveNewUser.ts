import { ActionFunctionArgs } from "react-router-dom";

interface RegisterCredentials {
  confirmPassword: string;
  email: string;
  password: string;
  userName: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { confirmPassword, email, password, userName } = Object.fromEntries(
    formData
  ) as unknown as RegisterCredentials;

  if (userName.length < 4)
    return {
      error: true,
      errorMessage: "User name need to be at least 4 characters",
    };

  if (typeof email !== "string" || !email.includes("@"))
    return {
      error: true,
      errorMessage: "Please enter a valid email",
    };

  if (password.length < 8)
    return {
      error: true,
      errorMessage: "Password needs to be at least 8 characters",
    };

  if (confirmPassword !== password)
    return {
      error: true,
      errorMessage: "Password doesn't match, please try again",
    };

  return null;
}
