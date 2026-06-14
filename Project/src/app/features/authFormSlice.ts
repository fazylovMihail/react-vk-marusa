import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  authForm: "login" | "reg" | "post-reg" | "none";
}

const initialState: AuthState = {
  authForm: "none",
};

const authFormSlice = createSlice({
  name: "authForm",
  initialState,
  reducers: {
    toogleForm: (state, action: { payload: AuthState["authForm"] }) => {
      state.authForm = action.payload;
    },
  },
});

export const { toogleForm } = authFormSlice.actions;
export const authFormSelector = (state: RootState) => state.authForm.authForm;
export default authFormSlice.reducer;
