import { Calendar, EventProps, View } from "react-big-calendar";
import { localizer, getMessage } from "../../helpers";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ButtonNewNote, CalendarEvent } from "../components";
import { ComponentType, useEffect, useState } from "react";
import { Modal } from "../../UI";
import { Note } from "./index";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IsOpenModal, openUI } from "../../store/slices/uiSlice";
import { EventNote } from "../../Types";
import { setActiveNote } from "../../store/slices/calendarSlice";
import useCalendarEvent from "../../hooks/useCalendarEvent";

export interface DataEvent {
  title: string;
  text: string;
  start: object;
  end: object;
  bgColor?: string;
  user: {
    _id: string;
    name: string;
  };
}

const CalendarApp = () => {
  const [view] = useState(localStorage.getItem("lastView") || "week");
  const openModal = useAppSelector(IsOpenModal);
  const dispatch = useAppDispatch();

  const { events, eventsData } = useCalendarEvent();

  const doubleClick = (event: EventNote) => {
    dispatch(setActiveNote(event));
    dispatch(openUI());
  };

  const oneClick = (event: EventNote) => {
    // console.log(event);
  };

  const viewChange = (event: string) => {
    localStorage.setItem("lastView", event);
  };

  const eventStyleGetter = () => {
    const style = {
      backgroundColor: "#008080",
      opacity: 0.8,
      borderRadius: "8px",
      color: "white",
      padding: "2px 8px",
    };

    return {
      style,
    };
  };

  useEffect(() => {

    eventsData();
  }, []);

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
          event: CalendarEvent as ComponentType<EventProps<EventNote>>,
        }}
        onDoubleClickEvent={doubleClick}
        onSelectEvent={oneClick}
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
