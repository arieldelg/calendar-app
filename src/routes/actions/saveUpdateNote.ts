import { differenceInSeconds } from "date-fns";
import { ActionFunctionArgs } from "react-router-dom";

export interface FormValues {
  endDate: string;
  notes: string;
  startDate: string;
  title: string;
}

export interface ErrorAction {
  error: boolean;
  errorMessage: string | null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { endDate, startDate, notes, title } = Object.fromEntries(
    formData
  ) as unknown as FormValues;
  console.log({ notes, title, endDate, startDate });
  const difference = differenceInSeconds(endDate, startDate);
  if (isNaN(difference))
    return {
      error: true,
      errorMessage: "Porfavor eliga una fecha de inicio o finalizacion",
    } as ErrorAction;
  if (difference < 0)
    return {
      error: true,
      errorMessage: "Porfavor eliga una fecha realista",
    } as ErrorAction;

  if (title.length === 0 || notes.length === 0)
    return {
      error: true,
      errorMessage: "Porfavor llene los campos obligatorios",
    } as ErrorAction;

  return {
    error: false,
    errorMessage: null,
  } as ErrorAction;
}
