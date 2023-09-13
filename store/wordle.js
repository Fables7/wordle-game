import words from "../words.json";
import { createSlice } from "@reduxjs/toolkit";

export const wordleSlice = createSlice({
  name: "wordle",
  initialState: {
    word: "",
    guesses: [],
    currentGuess: 0,
    didWin: false,
    didLose: false,
  },

  reducers: {
    initialise: (state) => {
      console.log("initialised");
      state.word = words[Math.round(Math.random() * words.length)];
      state.guesses = ["", "", "", "", "", ""];
      state.currentGuess = 0;
      console.log(state.word);
    },

    submitGuess: (state) => {
      if (state.guesses[state.currentGuess] === state.word) {
        console.log("you win");
        state.didWin = true;
      } else if (state.currentGuess === 5) {
        console.log("you lose");
        state.didLose = true;
      }
      state.currentGuess++;
    },
    handleKeyup: (state, action) => {
      console.log(state.currentGuess, "current guess");
      if (
        state.currentGuess === 6 ||
        state.guesses[state.currentGuess - 1] === state.word
      ) {
        console.log("game over");
        return;
      }
      if (action.payload === "Enter") {
        wordleSlice.caseReducers.submitGuess(state);
      }

      if (action.payload === "Backspace") {
        state.guesses[state.currentGuess] = state.guesses[
          state.currentGuess
        ].slice(0, -1);
      }

      if (
        state.currentGuess < 6 &&
        state.guesses[state.currentGuess].length < 5 &&
        action.payload.match(/^[A-z]$/)
      ) {
        state.guesses[state.currentGuess] =
          state.guesses[state.currentGuess] + action.payload.toLowerCase();
      }
    },

    checkWin: (state) => {
      return state.guesses[state.currentGuess] === state.word;
    },
  },
});

export const { initialise, submitGuess, handleKeyup } = wordleSlice.actions;

export default wordleSlice.reducer;
