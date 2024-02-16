import { baseColors } from "./constants";

export const getRangeOfConsecutiveNumbers = (start, stop) =>
  Array.from({ length: stop - start + 1 }, (_, i) => start + i);

export const generateBoard = () => {
  const randomisedColorArray = [];
  for (let i = 0; i < 64; i++) {
    randomisedColorArray.push({
      color: baseColors[Math.floor(Math.random() * 6)],
      index: i + 1,
    });
  }
  // return randomisedColorArray;
  return [
    {
      color: "yellow",
      index: 1,
    },
    {
      color: "purple",
      index: 2,
    },
    {
      color: "yellow",
      index: 3,
    },
    {
      color: "blue",
      index: 4,
    },
    {
      color: "yellow",
      index: 5,
    },
    {
      color: "red",
      index: 6,
    },
    {
      color: "purple",
      index: 7,
    },
    {
      color: "yellow",
      index: 8,
    },
    {
      color: "red",
      index: 9,
    },
    {
      color: "red",
      index: 10,
    },
    {
      color: "purple",
      index: 11,
    },
    {
      color: "purple",
      index: 12,
    },
    {
      color: "green",
      index: 13,
    },
    {
      color: "orange",
      index: 14,
    },
    {
      color: "yellow",
      index: 15,
    },
    {
      color: "red",
      index: 16,
    },
    {
      color: "yellow",
      index: 17,
    },
    {
      color: "red",
      index: 18,
    },
    {
      color: "red",
      index: 19,
    },
    {
      color: "orange",
      index: 20,
    },
    {
      color: "green",
      index: 21,
    },
    {
      color: "orange",
      index: 22,
    },
    {
      color: "red",
      index: 23,
    },
    {
      color: "blue",
      index: 24,
    },
    {
      color: "orange",
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
      color: "green",
      index: 28,
    },
    {
      color: "green",
      index: 29,
    },
    {
      color: "purple",
      index: 30,
    },
    {
      color: "purple",
      index: 31,
    },
    {
      color: "orange",
      index: 32,
    },
    {
      color: "red",
      index: 33,
    },
    {
      color: "yellow",
      index: 34,
    },
    {
      color: "orange",
      index: 35,
    },
    {
      color: "red",
      index: 36,
    },
    {
      color: "green",
      index: 37,
    },
    {
      color: "yellow",
      index: 38,
    },
    {
      color: "orange",
      index: 39,
    },
    {
      color: "red",
      index: 40,
    },
    {
      color: "blue",
      index: 41,
    },
    {
      color: "purple",
      index: 42,
    },
    {
      color: "green",
      index: 43,
    },
    {
      color: "blue",
      index: 44,
    },
    {
      color: "green",
      index: 45,
    },
    {
      color: "yellow",
      index: 46,
    },
    {
      color: "orange",
      index: 47,
    },
    {
      color: "red",
      index: 48,
    },
    {
      color: "yellow",
      index: 49,
    },
    {
      color: "green",
      index: 50,
    },
    {
      color: "red",
      index: 51,
    },
    {
      color: "purple",
      index: 52,
    },
    {
      color: "green",
      index: 53,
    },
    {
      color: "purple",
      index: 54,
    },
    {
      color: "purple",
      index: 55,
    },
    {
      color: "orange",
      index: 56,
    },
    {
      color: "yellow",
      index: 57,
    },
    {
      color: "red",
      index: 58,
    },
    {
      color: "blue",
      index: 59,
    },
    {
      color: "blue",
      index: 60,
    },
    {
      color: "orange",
      index: 61,
    },
    {
      color: "red",
      index: 62,
    },
    {
      color: "yellow",
      index: 63,
    },
    {
      color: "blue",
      index: 64,
    },
  ];
};
