import { calendarApi } from "../../api";
import { EventNote, FormValues } from "../../Types";
import { saveEvent, updateEvent } from "../slices/calendarSlice";
import { closeUI } from "../slices/uiSlice";

export const startSavingNote = (note: FormValues) => {
  return async (
    dispatch: (arg0: {
      payload: EventNote | undefined;
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

export const startUpdatingNote = (note: EventNote) => {
  return async (
    dispatch: (arg0: {
      payload: EventNote | undefined;
      type: "calendar/updateEvent" | "ui/closeUI";
    }) => void
  ) => {
    try {
      await calendarApi.put(`/calendarEvents/update/${note._id}`, note);

      dispatch(updateEvent(note));
    } catch (error) {
      console.log(error);
    }

    dispatch(closeUI());
  };
};
