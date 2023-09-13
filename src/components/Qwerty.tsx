import { useSelector } from "react-redux";

export const Qwerty = () => {
  const qwerty = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  return (
    <div>
      {qwerty.map((row) => (
        <div key={row} className="flex justify-center">
          {row.split("").map((key: string) => (
            <div
              key={key}
              className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-400"
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
