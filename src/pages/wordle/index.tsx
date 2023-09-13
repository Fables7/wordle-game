import React, { useState, useEffect } from "react";
import words from "../../../words.json";
import { Guess } from "@/components/Guess";
import { Qwerty } from "@/components/Qwerty";

import { useDispatch, useSelector } from "react-redux";
import { initialise, handleKeyup } from "../../../store/wordle";

const Wordle = () => {
  const dispatch = useDispatch();
  const word = useSelector((state: any) => state.wordle.word);
  const guesses = useSelector((state: any) => state.wordle.guesses);
  const currentGuess = useSelector((state: any) => state.wordle.currentGuess);

  const didWin = useSelector((state: any) => state.wordle.didWin);
  const didLose = useSelector((state: any) => state.wordle.didLose);

  useEffect(() => {
    dispatch(initialise(null));
    const handleKeyupFn = (e: any) => {
      dispatch(handleKeyup(e.key));
    };
    window.addEventListener("keyup", handleKeyupFn);

    return () => {
      window.removeEventListener("keyup", handleKeyupFn);
    };
  }, [dispatch]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-600">
      <h1 className="bg-gradient-to-br from-blue-400 to-green-400 bg-clip-text text-6xl font-bold uppercase text-transparent">
        Wordle
      </h1>
      <h2>word is {word}</h2>
      {guesses.map((_: any, i: number) => (
        <Guess
          key={i}
          word={word}
          guess={guesses[i]}
          isGuessed={i < currentGuess}
        />
      ))}
      {didWin && <h2>You won!</h2>}
      {didLose && <h2>You lost!</h2>}
      <Qwerty />

      <h2>{JSON.stringify(guesses)}</h2>
    </div>
  );
};

export default Wordle;
