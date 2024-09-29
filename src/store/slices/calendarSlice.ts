import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { EventNote } from "../../Types";

export interface NoteCalendar {
  title: string | null;
  notes: string | null;
  start: string | null;
  end: string | null;
  user: {
    _id: string;
    name: string;
  };
  bgColor: string;
}

interface CalendarSlice {
  events: EventNote[];
  active: EventNote | null;
}

/*!initialState*/
const initialState: CalendarSlice = {
  events: [],
  active: null,
};

/*!slice*/
export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    getEvents: (state, action: PayloadAction<EventNote[]>) => {
      state.events = action.payload;
    },
    saveEvent: (state, action: PayloadAction<EventNote>) => {
      state.events.push(action.payload);
    },
    setActiveNote: (state, action: PayloadAction<EventNote>) => {
      state.active = action.payload;
    },
    newNote: (state) => {
      state.active = null;
    },
    updateEvent: (state, action: PayloadAction<EventNote>) => {
      state.events = state.events.map((element) => {
        if (element._id === action.payload._id) {
          return action.payload;
        }
        return element;
      });
    },
    deleteNote: (state, action: PayloadAction<EventNote[]>) => {
      state.events = action.payload
    }
  },
});

/*!exportamos las acciones del slice*/
export const { saveEvent, setActiveNote, newNote, updateEvent, getEvents, deleteNote } =
  calendarSlice.actions;

/* ! esto lo qu exportamos al store*/
export default calendarSlice.reducer;

const ACTIVEEVENT = (state: RootState) => state;
const EVENTS = (state: RootState) => state;

export const ActiveStateSelector = createSelector(
  [ACTIVEEVENT],
  (ACTIVEEVENT) => ACTIVEEVENT.calendar.active
);

export const EVENTSNOTES = createSelector(
  [EVENTS],
  (EVENTS) => EVENTS.calendar.events
);
