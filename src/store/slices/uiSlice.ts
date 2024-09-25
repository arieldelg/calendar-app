import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UiSlice {
  isOpen: boolean;
}

/*!initialState*/
const initialState: UiSlice = {
  isOpen: false,
};

/*!slice*/
export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openUI: (state) => {
      state.isOpen = true;
    },
    closeUI: (state) => {
      state.isOpen = false;
    },
  },
});

/*!exportamos las acciones del slice*/
export const { openUI, closeUI } = uiSlice.actions;

/* ! esto lo qu exportamos al store*/
export default uiSlice.reducer;

const ISOPEN = (state: RootState) => state;

export const IsOpenModal = createSelector(
  [ISOPEN],
  (ISOPEN) => ISOPEN.ui.isOpen
);
