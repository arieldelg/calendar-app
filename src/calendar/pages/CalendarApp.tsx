import { addHours } from "date-fns";
import { Calendar, EventProps, View } from "react-big-calendar";
import { localizer, getMessage } from "../../helpers";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ButtonNewNote, CalendarEvent } from "../components";
import { ComponentType, useState } from "react";
import { Modal } from "../../UI";
import { Note } from "./index";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IsOpenModal, openUI } from "../../store/slices/uiSlice";
import { setActiveNote } from "../../store/slices/calendarSlice";

export interface DataEvent {
  title: string;
  notes: string;
  start: object;
  end: object;
  bgColor: string;
  user: {
    _id: string;
    name: string;
  };
}

const events: DataEvent[] = [
  {
    title: "nota de prueba",
    notes: "es una prueba",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#FF0000",
    user: {
      _id: "123",
      name: "ariel",
    },
  },
  {
    title: "2nota de prueba",
    notes: "es una prueba 2",
    start: new Date(),
    end: addHours(new Date(), 10),
    bgColor: "#A020F0",
    user: {
      _id: "123",
      name: "ariel",
    },
  },
];

const CalendarApp = () => {
  const [view] = useState(localStorage.getItem("lastView") || "week");
  const openModal = useAppSelector(IsOpenModal);
  const dispatch = useAppDispatch();
  // const [open, setOpen] = useState<boolean>(false);
  const doubleClick = (event: DataEvent) => {
    const start = JSON.stringify(event.start);
    const end = JSON.stringify(event.end);
    const data = {
      ...event,
      start,
      end,
    };
    dispatch(setActiveNote(data));
    dispatch(openUI());
  };
  // // const oneClick = (props: event) => {
  // //   dispatch(openUI());
  // };
  const viewChange = (event: string) => {
    localStorage.setItem("lastView", event);
  };
  const eventStyleGetter = (event: DataEvent) => {
    const style = {
      backgroundColor: event.bgColor,
      opacity: 0.8,
      borderRadius: "8px",
      color: "white",
      padding: "2px 8px",
    };

    return {
      style,
    };
  };
  return (
    <section className="h-full w-full relative">
      <Calendar
        culture="es"
        localizer={localizer}
        defaultView={view as View} //para que grabe cuando refresques la pagina
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 5rem )", padding: "20px 0 20px 0" }}
        eventPropGetter={eventStyleGetter}
        messages={getMessage()}
        components={{
          event: CalendarEvent as ComponentType<EventProps<DataEvent>>,
        }}
        onDoubleClickEvent={doubleClick}
        // onSelectEvent={oneClick}
        onView={viewChange} //para saber en que vista estas, semana, mes, dia, agenda
      />
      {openModal && (
        <Modal>
          <Note />
        </Modal>
      )}
      <ButtonNewNote />
    </section>
  );
};

export default CalendarApp;
