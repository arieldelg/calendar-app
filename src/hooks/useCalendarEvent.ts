import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ActiveStateSelector, newNote } from "../store/slices/calendarSlice";
import { DataEvent } from "../calendar/pages/CalendarApp";

const useCalendarEvent = (): {
  data: DataEvent | object;
  createNewForm: () => void;
} => {
  const dispatch = useAppDispatch();
  const active = useAppSelector(ActiveStateSelector);

  //* function that is triggered when creating a new Note
  const createNewForm = () => {
    dispatch(newNote());
  };

  //* event comes from an active note return existing values
  let data = {};
  if (active) {
    const startParse = JSON.parse(active?.start as string);
    const endParse = JSON.parse(active?.end as string);
    const start = new Date(startParse);
    const end = new Date(endParse);
    data = {
      ...active,
      start,
      end,
    };
  }

  return {
    data,
    createNewForm,
  };
};

export default useCalendarEvent;
