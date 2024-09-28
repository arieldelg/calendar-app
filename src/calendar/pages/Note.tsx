import { FormEvent, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
import useUiStore from "../../hooks/useUiStore";
import useCalendarEvent from "../../hooks/useCalendarEvent";
import { DataEvent } from "./CalendarApp";
import { addHours, differenceInSeconds } from "date-fns";
import { FormValues } from "../../Types";
import { useAppDispatch } from "../../store/hooks";
import { startSavingNote } from "../../store/calendarThunk/thunk";
registerLocale("es", es);

const Note = () => {
  const dispatch = useAppDispatch();
  const { closeModal } = useUiStore();
  const { data } = useCalendarEvent() as { data: DataEvent };

  const [error, setError] = useState<{
    ok: boolean;
    errorText: string;
    errorDate: string;
  }>({
    ok: true,
    errorDate: "",
    errorText: "",
  });

  const [stateDate, setStateDate] = useState({
    startDate: data?.start || new Date(),
    endDate: data?.end || addHours(new Date(), +2),
    title: data?.title || "",
    text: data?.text || "",
  });

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { text, title } = Object.fromEntries(
      formData
    ) as unknown as FormValues;

    const endDate = new Date(stateDate.endDate as unknown as string).getTime();
    const startDate = new Date(
      stateDate.startDate as unknown as string
    ).getTime();

    const difference = differenceInSeconds(endDate, startDate);

    const errorObject = {
      errorDate: "",
      errorText: "",
    };

    if (isNaN(difference)) {
      errorObject.errorDate = "Date are Required";
    }
    if (difference < 0) {
      errorObject.errorDate = "Please choose a valid Date";
    }

    if (text.length === 0 || title.length === 0) {
      errorObject.errorText = "Note and Text are required";
    }

    const validate = Object.values(errorObject).every(
      (values) => values.length === 0
    );

    if (!validate)
      return setError({
        ok: false,
        ...errorObject,
      });

    setError({
      ok: true,
      ...errorObject,
    });

    const data = {
      startDate,
      endDate,
      text,
      title,
    };

    dispatch(startSavingNote(data as unknown as FormValues));
  };

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
          </h1>
        </div>
        <form
          className="w-full h-full flex flex-col justify-between gap-2"
          onSubmit={handleForm}
        >
          <div className="flex flex-col justify-evenly w-full h-full">
            {!error?.ok && error?.errorDate ? (
              <p className="text-center text-red-500 font-mono font-bold text-lg">
                {error.errorDate}
              </p>
            ) : null}

            <div className="w-full h-60  flex flex-col justify-between">
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
                      ...prev,
                      startDate: date as Date,
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
                      ...prev,
                      endDate: date as Date,
                    }))
                  }
                />
              </div>
            </div>

            <hr className="" />
            {!error?.ok && error?.errorText ? (
              <p className="text-red-500 text-center font-mono font-bold text-lg">
                {error.errorText}
              </p>
            ) : null}
            <div className="flex flex-col mb-2 py-2 gap-2">
              <label className="text-xl">Titulo y notas</label>
              <input
                type="text"
                className="ring-2 px-2 rounded-md h-7 focus:ring-blue-500 focus:outline-none"
                placeholder="Título del evento"
                name="title"
                autoComplete="off"
                defaultValue={stateDate.title}
              />
            </div>

            <div className="flex flex-col">
              <textarea
                className="outline-none ring-2 rounded-md focus:ring-offset-blue-500 ring-offset-2 px-2 py-1"
                placeholder="Notas"
                rows={5}
                name="text"
                defaultValue={stateDate.text}
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-green-300 rounded-md ring-2 ring-green-600 hover:bg-green-500"
          >
            Guardar
          </button>
        </form>
      </div>
    </section>
  );
};

export default Note;
