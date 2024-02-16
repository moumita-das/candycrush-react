import { baseColors } from "./constants";

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
      (!currentColor || array[i].index % 8 == 0 || i % 8 == 0) &&
      !inValidIndexes.includes(array[i].index)
    ) {
      // if (!inValidIndexes.includes(array[i].index)) subset = [];
      currentColor = array[i].color; // if currentColor is null, ie new color grouping start, or first element in row of board
      if (subset.length < 1 || i % 8 == 0) subset = [];
    }
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
  let currentColor = null;
  // no need to carry out the check for last 2 rows in board
  for (let i = 0; i < array.length; i += 8) {
    if (!currentColor || (0 <= i && i <= 7 && array[i].index <= 48)) {
      currentColor = array[i].color;
      subset = [];
    }
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
    }
    if (array[i].index >= 57 && array[i].index <= 63) {
      if (subset.length >= 3) {
        matches.push({
          indices: [...subset],
          matchedColor: currentColor,
        });
      }
      i = (array[i].index % 8) - 8;
    }
  }
  return matches;
}
export function matchExists(array) {
  const horizontalMatches = getHorizontalMatches(array);
  const verticalMatches = getVerticalMatches(array);
  return { horizontalMatches, verticalMatches };
}

export function removeMatches(
  updatedGrid,
  horizontalMatches,
  verticalMatches,
  boardChanged
) {
  horizontalMatches.map((item) => {
    item.indices.map((index) => {
      updatedGrid[index - 1].color = "";
    });
  });
  verticalMatches.map((item) => {
    item.indices.map((index) => {
      updatedGrid[index - 1].color = "";
    });
  });
  if (!boardChanged) {
    let indicesToFill = [
      ...horizontalMatches.map((item) => [...item.indices]),
      ...verticalMatches.map((item) => [...item.indices]),
    ]
      .reduce(function (prev, next) {
        return prev.concat(next);
      })
      .sort();
    updatedGrid = fillColors(updatedGrid, indicesToFill);
  } else {
    updatedGrid = moveDownTiles(
      updatedGrid,
      horizontalMatches,
      verticalMatches
    );
  }
  return updatedGrid;
}

export function fillColors(updatedGrid, indicesToFill) {
  const totalColors = baseColors.length;
  indicesToFill.map((index) => {
    const colorsToAvoid = [];
    // find colors which are top, right, bottom and left of the selected index, being mindful of the edge cases
    if (index - 8 >= 1 && updatedGrid[index - 8].color != "")
      colorsToAvoid.push(updatedGrid[index - 8].color);
    if (index % 8 != 0 && updatedGrid[index + 1].color != "")
      colorsToAvoid.push(updatedGrid[index + 1].color);
    if ((index - 1) % 8 != 0 && updatedGrid[index - 1].color != "")
      colorsToAvoid.push(updatedGrid[index - 1].color);
    if (index + 8 <= 64 && updatedGrid[index + 8].color != "")
      colorsToAvoid.push(updatedGrid[index + 8].color);
    updatedGrid[index - 1].color = baseColors.filter(
      (color) => colorsToAvoid.indexOf(color) < 0
    )[Math.floor(Math.random() * (totalColors - colorsToAvoid.length))];
  });

  return updatedGrid;
}
function colorToFillForTile(updatedGrid, indexToFill) {
  const totalColors = baseColors.length;
  const colorsToAvoid = [];
  //top not needed as empty
  if (indexToFill % 8 != 0 && updatedGrid[indexToFill].color != "")
    colorsToAvoid.push(updatedGrid[indexToFill].color); //right color
  if ((indexToFill - 1) % 8 != 0 && updatedGrid[indexToFill - 2].color != "")
    colorsToAvoid.push(updatedGrid[indexToFill - 2].color); //left color
  if (indexToFill + 8 <= 64 && updatedGrid[indexToFill + 8 - 1].color != "")
    colorsToAvoid.push(updatedGrid[indexToFill + 8 - 1].color);
  return baseColors.filter((color) => colorsToAvoid.indexOf(color) < 0)[
    Math.floor(Math.random() * (totalColors - colorsToAvoid.length))
  ];
}

export function moveDownTiles(updatedGrid, horizontalMatches, verticalMatches) {
  verticalMatches.map((item) => {
    const mutableIndicesToMove = [...item.indices];
    console.log(mutableIndicesToMove);
    let counter = mutableIndicesToMove.at(-1);
    while (counter >= 1) {
      const indexAbove = counter - 8 * mutableIndicesToMove.length;
      updatedGrid[counter - 1].color =
        indexAbove >= 1
          ? updatedGrid[indexAbove - 1].color
          : colorToFillForTile(updatedGrid, counter);
      counter = counter - 8;
    }
  });
  let counter = 64;
  while (counter >= 1) {
    if (updatedGrid[counter - 1].color == "") {
      if (counter - 8 - 1 > 0) {
        updatedGrid[counter - 1].color = updatedGrid[counter - 8 - 1].color;
        updatedGrid[counter - 8 - 1].color = "";
      } else {
        updatedGrid[counter - 1].color = colorToFillForTile(
          updatedGrid,
          counter
        );
      }
    }

    counter -= 1;
  }
  return updatedGrid;
}

export function isValidMove(updatedGrid, start, end) {
  let validMove = true;
  if (Math.abs(end - start) != 1 && Math.abs(end - start) != 8)
    validMove = false;
  if (start + 1 == end && start % 8 == 0) validMove = false;
  if (start - 1 == end && end % 8 == 0) validMove = false;
  if (!validMove) return { validMove, updatedGrid };
  let temp = updatedGrid[start - 1].color;
  updatedGrid[start - 1].color = updatedGrid[end - 1].color;
  updatedGrid[end - 1].color = temp;
  const { horizontalMatches, verticalMatches } = matchExists(updatedGrid);
  validMove = horizontalMatches.length > 0 || verticalMatches.length > 0;
  return { validMove: validMove, updatedGrid: updatedGrid };
}
