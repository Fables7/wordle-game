import words from "../words.json";
import { createSlice, createSelector } from "@reduxjs/toolkit";

export const getAllGuesses = createSelector(
  (state) => [state.wordle.guesses, state.wordle.currentGuess],
  ([guesses, currentGuess]) => {
    return guesses.slice(0, currentGuess).join("").split("");
  }
);

export const getExactGuesses = createSelector(
  (state) => [
    state.wordle.word,
    state.wordle.guesses,
    state.wordle.currentGuess,
  ],
  ([word, guesses, currentGuess]) => {
    return word.split("").filter((letter, i) => {
      return guesses
        .slice(0, currentGuess)
        .map((word) => word[i])
        .includes(letter);
    });
  }
);

export const getInexactGuesses = createSelector(
  (state) => [
    state.wordle.word,
    getAllGuesses(state),
  ],
  ([word, allGuesses]) => {
    return word.split("").filter((letter, i) => allGuesses.includes(letter));
  }
);

export const wordleSlice = createSlice({
  name: "wordle",
  initialState: {
    word: "",
    guesses: [],
    currentGuess: 0,
    didWin: false,
    didLose: false,
    exactGuesses: [],
    inexactGuesses: [],
  },

  reducers: {
    initialise: (state) => {
      console.log("initialised");
      state.word = words[Math.round(Math.random() * words.length)];
      state.guesses = ["", "", "", "", "", ""];
      state.currentGuess = 0;
      state.didWin = false;
      state.didLose = false;
    },

    submitGuess: (state) => {
      if (state.guesses[state.currentGuess] === state.word) {
        console.log("you win");
        state.didWin = true;
      } else if (state.currentGuess === 5) {
        console.log("you lose");
        state.didLose = true;
      }
      if (words.includes(state.guesses[state.currentGuess])) {
        state.currentGuess++;
      }
    },
    handleKeyup: (state, action) => {
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
  },
});

export const { initialise, submitGuess, handleKeyup } = wordleSlice.actions;

export default wordleSlice.reducer;
