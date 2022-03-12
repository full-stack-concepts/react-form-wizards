import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from './UserSlice';

const rootReducer = combineReducers({
	user: UserSlice
});

export const store = configureStore({
  reducer: rootReducer,
});
