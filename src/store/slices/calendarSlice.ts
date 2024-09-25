import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
  events: NoteCalendar[];
  active: NoteCalendar | null;
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
    saveEvent: (state, action: PayloadAction<NoteCalendar>) => {
      state.events.push(action.payload);
    },
    setActiveNote: (state, action: PayloadAction<NoteCalendar>) => {
      state.active = action.payload;
    },
    newNote: (state) => {
      state.active = null;
    },
  },
});

/*!exportamos las acciones del slice*/
export const { saveEvent, setActiveNote, newNote } = calendarSlice.actions;

/* ! esto lo qu exportamos al store*/
export default calendarSlice.reducer;

const ACTIVEEVENT = (state: RootState) => state;

export const ActiveStateSelector = createSelector(
  [ACTIVEEVENT],
  (ACTIVEEVENT) => ACTIVEEVENT.calendar.active
);
