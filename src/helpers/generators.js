import { baseColors } from "./constants";

export const getRangeOfConsecutiveNumbers = (start, stop) =>
  Array.from({ length: stop - start + 1 }, (_, i) => start + i);

export const generateBoard = () => {
  const randomisedColorArray = [];
  for (let i = 0; i <= 64; i++) {
    randomisedColorArray.push({
      color: baseColors[Math.floor(Math.random() * 6)],
      index: i + 1,
    });
  }
  //   return randomisedColorArray;
  return [
    {
      color: "blue",
      index: 1,
    },
    {
      color: "purple",
      index: 2,
    },
    {
      color: "orange",
      index: 3,
    },
    {
      color: "orange",
      index: 4,
    },
    {
      color: "yellow",
      index: 5,
    },
    {
      color: "blue",
      index: 6,
    },
    {
      color: "red",
      index: 7,
    },
    {
      color: "green",
      index: 8,
    },
    {
      color: "red",
      index: 9,
    },
    {
      color: "purple",
      index: 10,
    },
    {
      color: "purple",
      index: 11,
    },
    {
      color: "green",
      index: 12,
    },
    {
      color: "yellow",
      index: 13,
    },
    {
      color: "red",
      index: 14,
    },
    {
      color: "red",
      index: 15,
    },
    {
      color: "green",
      index: 16,
    },
    {
      color: "green",
      index: 17,
    },
    {
      color: "purple",
      index: 18,
    },
    {
      color: "purple",
      index: 19,
    },
    {
      color: "yellow",
      index: 20,
    },
    {
      color: "green",
      index: 21,
    },
    {
      color: "purple",
      index: 22,
    },
    {
      color: "green",
      index: 23,
    },
    {
      color: "yellow",
      index: 24,
    },
    {
      color: "blue",
      index: 25,
    },
    {
      color: "red",
      index: 26,
    },
    {
      color: "orange",
      index: 27,
    },
    {
      color: "red",
      index: 28,
    },
    {
      color: "blue",
      index: 29,
    },
    {
      color: "red",
      index: 30,
    },
    {
      color: "green",
      index: 31,
    },
    {
      color: "green",
      index: 32,
    },
    {
      color: "purple",
      index: 33,
    },
    {
      color: "purple",
      index: 34,
    },
    {
      color: "purple",
      index: 35,
    },
    {
      color: "blue",
      index: 36,
    },
    {
      color: "orange",
      index: 37,
    },
    {
      color: "green",
      index: 38,
    },
    {
      color: "yellow",
      index: 39,
    },
    {
      color: "yellow",
      index: 40,
    },
    {
      color: "purple",
      index: 41,
    },
    {
      color: "green",
      index: 42,
    },
    {
      color: "purple",
      index: 43,
    },
    {
      color: "green",
      index: 44,
    },
    {
      color: "blue",
      index: 45,
    },
    {
      color: "red",
      index: 46,
    },
    {
      color: "red",
      index: 47,
    },
    {
      color: "orange",
      index: 48,
    },
    {
      color: "purple",
      index: 49,
    },
    {
      color: "blue",
      index: 50,
    },
    {
      color: "blue",
      index: 51,
    },
    {
      color: "purple",
      index: 52,
    },
    {
      color: "orange",
      index: 53,
    },
    {
      color: "red",
      index: 54,
    },
    {
      color: "green",
      index: 55,
    },
    {
      color: "purple",
      index: 56,
    },
    {
      color: "orange",
      index: 57,
    },
    {
      color: "orange",
      index: 58,
    },
    {
      color: "orange",
      index: 59,
    },
    {
      color: "yellow",
      index: 60,
    },
    {
      color: "red",
      index: 61,
    },
    {
      color: "red",
      index: 62,
    },
    {
      color: "red",
      index: 63,
    },
    {
      color: "red",
      index: 64,
    },
    {
      color: "orange",
      index: 65,
    },
  ];
};
