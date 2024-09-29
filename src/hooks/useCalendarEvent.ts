import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  ActiveStateSelector,
  EVENTSNOTES,
  getEvents,
  newNote,
} from "../store/slices/calendarSlice";
import { EventNote } from "../Types";
import { calendarApi } from "../api";

const useCalendarEvent = (): {
  data: EventNote | null;
  createNewForm: () => void;
  events: EventNote[];
  eventsData: () => void;
} => {
  const dispatch = useAppDispatch();
  const active = useAppSelector(ActiveStateSelector);
  const events = useAppSelector(EVENTSNOTES);
  //* function that is triggered when creating a new Note
  const createNewForm = () => {
    dispatch(newNote());
  };

  const eventsData = async () => {
    try {
      const {
        data: { data },
      } = (await calendarApi.get("/calendarEvents")) as {
        data: { data: EventNote[] };
      };

      data.map((element) => {
        element.start = new Date(element.start);
        element.end = new Date(element.end);
        return element;
      });
      dispatch(getEvents(data));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    data: active,
    createNewForm,
    events,
    eventsData,
  };
};

export default useCalendarEvent;
