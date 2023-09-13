import { useSelector, useDispatch } from "react-redux";
import {
  getExactGuesses,
  getInexactGuesses,
  getAllGuesses,
} from "../../store/wordle";

export const Qwerty = () => {
  const qwerty = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  const exactGuesses = useSelector(getExactGuesses);
  const inexactGuesses = useSelector(getInexactGuesses);
  const allGuesses = useSelector(getAllGuesses);

  return (
    <div>
      {qwerty.map((row) => (
        <div key={row} className="flex justify-center">
          {row.split("").map((char: string, i) => {
            const bgColor = exactGuesses.includes(char)
              ? "bg-green-400"
              : inexactGuesses.includes(char)
              ? "bg-yellow-400"
              : allGuesses.includes(char)
              ? "bg-gray-400"
              : "bg-gray-200";
            return (
              <div
                key={i}
                className={`rounded-m m-px flex h-10 w-10 items-center justify-center uppercase ${bgColor}`}
              >
                {char}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
