import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authFormReducer from "./features/authFormSlice";
import profileReducer from "./features/profileSlice";
import viewerReducer from "./features/viewerSlice";

const rootReducer = combineReducers({
  authForm: authFormReducer,
  profile: profileReducer,
  viewer: viewerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
