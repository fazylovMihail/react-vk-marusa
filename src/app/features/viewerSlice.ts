import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ViewerState {
  isOpen: boolean;
}

const initialState: ViewerState = {
  isOpen: false,
};

const viewerSlice = createSlice({
  name: "viewer",
  initialState,
  reducers: {
    openViewer: (state) => {
      state.isOpen = true;
    },
    closeViewer: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openViewer, closeViewer } = viewerSlice.actions;
export const isOpenViewerSelector = (state: RootState) => state.viewer.isOpen;
export default viewerSlice.reducer;
