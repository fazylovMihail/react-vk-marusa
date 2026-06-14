import { User } from "@/api/User";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ProfileState {
  profile: User;
  isAuth: boolean;
}

const initialState: ProfileState = {
  profile: {
    name: "",
    surname: "",
    email: "",
    favorites: [],
  },
  isAuth: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: { payload: User }) => {
      state.profile = action.payload;
      state.isAuth = true;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export const profileSelector = (state: RootState) => state.profile;
export default profileSlice.reducer;
