import { getRangeOfConsecutiveNumbers } from "./generators";

export function emptySlotExists(array) {
  let slots = [];
  array.map((item, index) => {
    if (item === "") slots.push(index + 1);
  });
  return {
    slotsExist: slots.length > 0,
    slots,
  };
}

function getHorizontalMatches(array) {
  const inValidIndexes = [
    7, 8, 15, 16, 23, 24, 31, 32, 39, 40, 47, 48, 55, 56, 63, 63,
  ]; // no need to carry out the check for last 2 columns in board
  let subset = [],
    matches = [];
  let currentColor = null;
  for (let i = 0; i < array.length; i++) {
    if (
      (!currentColor || array[i].index % 8 == 0) &&
      !inValidIndexes.includes(array[i].index)
    )
      currentColor = array[i].color; // if currentColor is null, ie new color grouping start, or first element in row of board
    if (array[i].color === currentColor) {
      subset.push(array[i].index);
    } else {
      // new color found, make decision about previous color
      if (subset.length >= 3) {
        matches.push({
          indices: [...subset],
          matchedColor: currentColor,
        });
      }
      // start new subset
      currentColor = array[i].color;
      subset = [array[i].index];
    }
  }
  return matches;
}
function getVerticalMatches(array) {
  let subset = [],
    matches = [];
  let currentColor = null,
    currentColumn = 0;
  // no need to carry out the check for last 2 rows in board
  for (let i = 0; i < array.length; i += 8) {
    console.log(array[i].index, currentColor);
    if (
      (!currentColor || (1 <= array[i].index && array[i].index <= 8)) &&
      array[i].index <= 48
    )
      currentColor = array[i].color;
    if (array[i].color === currentColor) {
      subset.push(array[i].index);
    } else {
      if (subset.length >= 3) {
        matches.push({
          indices: [...subset],
          matchedColor: currentColor,
        });
      }
      subset = [array[i].index];
      currentColor = array[i].color;
      // i = i - 8 > 0 ? i - 8 : i;
    }
    if (array[i].index >= 57 && array[i].index <= 63) {
      console.log("--", array[i].index);

      i = (array[i].index % 8) - 8;
    }
  }
  console.log(matches);
}
export function matchExists(array) {
  const horizontalMatches = getHorizontalMatches(array);
  const verticalMatches = getVerticalMatches(array);
}
