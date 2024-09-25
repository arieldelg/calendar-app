// import { FormEvent } from "react";
import { FormEvent, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { Form, useActionData, useSubmit } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
import { ErrorAction } from "../../routes/actions/saveUpdateNote";
import useUiStore from "../../hooks/useUiStore";
import useCalendarEvent from "../../hooks/useCalendarEvent";
import { DataEvent } from "./CalendarApp";
registerLocale("es", es);

const Note = () => {
  const error = useActionData() as ErrorAction;
  const submit = useSubmit();

  const { closeModal } = useUiStore();

  const { data } = useCalendarEvent() as { data: DataEvent };

  const [isError, setIsError] = useState<ErrorAction | null>(error);

  const [stateDate, setStateDate] = useState({
    startDate: data?.start || new Date(),
    endDate: data?.end || new Date(),
  });

  const [valueForm] = useState<{ title: string; note: string }>({
    title: data?.title || "",
    note: data?.notes || "",
  });

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    formData.set("startDate", stateDate.startDate as unknown as string);
    formData.set("endDate", stateDate.endDate as unknown as string);

    submit(formData, {
      method: "post",
      action: "/calendar",
    });
  };

  useEffect(() => {
    setIsError(error);
    return () => {
      if (error) error.error = false;
      if (error) error.errorMessage = null;
      setIsError(error);
    };
  }, [error]);

  return (
    <section
      className="text-black flex items-center justify-center w-full h-full bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  "
      onClick={() => closeModal()}
    >
      <div
        className="w-4/6 h-5/6 bg-white rounded-md ring-2 p-4 font-mono font-bold grid grid-rows-[50px_auto] md:grid-rows-[100px_auto] overflow-scroll scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-full">
          <h1 className="border-b-[1px] text-4xl pb-2 h-full flex flex-col justify-center items-center">
            Nuevo evento
            {isError && isError.error && (
              <p className="text-red-500 text-center text-lg">
                {isError.errorMessage}
              </p>
            )}
          </h1>
        </div>
        <Form
          className="w-full h-full flex flex-col justify-between gap-4"
          action="/calendar"
          onSubmit={handleForm}
        >
          <div className="flex flex-col justify-evenly w-full h-full">
            <div className="flex flex-col py-2 gap-1">
              <label className="text-xl ">Fecha y hora inicio</label>
              <DatePicker
                selected={stateDate.startDate as Date}
                name="startDate"
                className="h-7 ring-1 px-2 rounded-md focus:outline-blue-400 w-full text-center"
                dateFormat={"Pp"}
                showTimeSelect
                locale={"es"}
                timeCaption="Hora"
                onChange={(date) =>
                  setStateDate((prev) => ({
                    startDate: date as Date,
                    endDate: prev.endDate,
                  }))
                }
              />
            </div>

            <div className="flex flex-col py-2 gap-2">
              <label className="text-xl">Fecha y hora fin</label>
              <DatePicker
                minDate={stateDate.startDate as Date}
                selected={stateDate.endDate as Date}
                name="endDate"
                className="h-7 ring-1 px-2 rounded-md focus:outline-blue-400 w-full text-center"
                dateFormat={"Pp"}
                showTimeSelect
                locale={"es"}
                timeCaption="Hora"
                onChange={(date) =>
                  setStateDate((prev) => ({
                    startDate: prev.startDate,
                    endDate: date as Date,
                  }))
                }
              />
            </div>

            <hr className="" />
            <div className="flex flex-col mb-2 py-2 gap-2">
              <label className="text-xl">Titulo y notas</label>
              <input
                type="text"
                className="ring-2 px-2 rounded-md h-7 focus:ring-blue-500 focus:outline-none"
                placeholder="Título del evento"
                name="title"
                autoComplete="off"
                defaultValue={valueForm.title}
              />
            </div>

            <div className="flex flex-col">
              <textarea
                className="outline-none ring-2 rounded-md focus:ring-offset-blue-500 ring-offset-2 px-2 py-1"
                placeholder="Notas"
                rows={5}
                name="notes"
                defaultValue={valueForm.note}
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-green-300 rounded-md ring-2 ring-green-600 hover:bg-green-500"
          >
            Guardar
          </button>
        </Form>
      </div>
    </section>
  );
};

export default Note;
