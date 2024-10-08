import { calendarApi } from "../../api";
import { EventNote } from "../../Types";
import { deleteNote, saveEvent, updateEvent } from "../slices/calendarSlice";
import { closeUI } from "../slices/uiSlice";
import { RootState } from "../store";

export const startSavingNote = (note: { text: string, title: string, start: number, end: number}) => {
  return async (
    dispatch: (arg0: { payload: EventNote | undefined; type: "ui/closeUI" | "calendar/saveEvent"; }) => void,
  ) => {
    
    try {
      const {
        data: { data },
      } = await calendarApi.post("/calendarEvents/new", note) as {data: { data: EventNote } };

      const convertDataDate = {
        ...data,
        start: new Date(data.start),
        end: new Date(data.end)
      }
      dispatch(saveEvent(convertDataDate));
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
    const convertDataDate = {
      ...note,
      start: new Date(note.start),
      end: new Date(note.end)
    }
    try {
      await calendarApi.put(`/calendarEvents/update/${note._id}`, note);


      dispatch(updateEvent(convertDataDate));
    } catch (error) {
      console.log(error);
    }

    dispatch(closeUI());
  };
};

export const startDeleteNote = (idNote: string) => { 
  return async (dispatch: (
    arg0: 
      { 
        payload: EventNote[]; 
        type: "calendar/deleteNote"; 
      }
    ) => void,
    getState: () => RootState
  ) => {
    const events = getState().calendar.events

    const newEvents = events.filter((note) => note._id !== idNote)
    dispatch(deleteNote(newEvents))

    try {
      await calendarApi.delete(`calendarEvents/delete/${idNote}`)
    } catch (error) {
      console.log(error)
    }

  }
 }
