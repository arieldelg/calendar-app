import { calendarApi } from "../../api";
import { FormValues } from "../../Types";
import { NoteCalendar, saveEvent } from "../slices/calendarSlice";
import { closeUI } from "../slices/uiSlice";

export const startSavingNote = (note: FormValues) => {
  return async (
    dispatch: (arg0: {
      payload: NoteCalendar | undefined;
      type: "ui/closeUI" | "calendar/saveEvent";
    }) => void
  ) => {
    try {
      const {
        data: { data },
      } = await calendarApi.post("/calendarEvents/new", note);

      dispatch(saveEvent(data));
      dispatch(closeUI());
    } catch (error) {
      console.log(error);
    }
  };
};
