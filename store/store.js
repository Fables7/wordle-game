import { configureStore } from "@reduxjs/toolkit";
import wordleReducer from "./wordle";

export const store = configureStore({
  reducer: {
    wordle: wordleReducer,
  },
});
