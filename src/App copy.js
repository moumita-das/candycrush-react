import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { useState } from "react";
import Grid from "./components/Grid";
import { useEffect } from "react";
const colors = ["blue", "green", "orange", "purple", "red", "yellow"];
// const stripedColors=[]
function removeDuplicates(updatedGrid, size) {
  // remove duplicates from rows
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size - 2; j++) {
      if (
        updatedGrid[i][j] != "" &&
        updatedGrid[i][j] === updatedGrid[i][j + 1] &&
        updatedGrid[i][j + 1] === updatedGrid[i][j + 2]
      )
        updatedGrid[i][j] = "";
    }
  }
  // remove duplicates from columns
  for (let i = 0; i < size - 2; i++) {
    for (let j = 0; j < size; j++) {
      if (
        updatedGrid[i][j] != "" &&
        updatedGrid[i][j] === updatedGrid[i + 1][j] &&
        updatedGrid[i + 1][j] === updatedGrid[i + 2][j]
      )
        updatedGrid[i][j] = "";
    }
  }

  return updatedGrid;
}
function replaceTile(updatedGrid, size, updatedColors) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (updatedGrid[i][j] != "" && updatedGrid[i][j] != undefined) continue;
      let updatedColorsWithoutDuplicates = updatedColors.filter(
        (item) =>
          [
            updatedGrid[i][j],
            i + 1 < size ? updatedGrid[i + 1][j] : "",
            i - 1 >= 0 ? updatedGrid[i - 1][j] : "",
            j + 1 < size ? updatedGrid[i][j + 1] : "",
            j - 1 >= 0 ? updatedGrid[i][j - 1] : "",
          ].indexOf(item) < 0
      );
      updatedGrid[i][j] =
        updatedColorsWithoutDuplicates[
          Math.floor(Math.random() * updatedColorsWithoutDuplicates.length)
        ];
    }
  }
  return updatedGrid;
}
const range = (start, stop) =>
  Array.from({ length: stop - start + 1 }, (_, i) => start + i);

const findAdjacentTiles = (fixed, row, size) => {
  let left = fixed,
    right = fixed;
  let toBreak = false;
  while (left >= 0 && right < size && !toBreak) {
    if (left - 1 >= 0 && row[left - 1] === row[fixed]) left -= 1;
    if (right + 1 < size && row[right + 1] === row[fixed]) right += 1;
    if (
      (left === 0 || (left - 1 >= 0 && row[left - 1] !== row[fixed])) &&
      (right + 1 === size ||
        (right + 1 < size && row[right + 1] !== row[fixed]))
    )
      toBreak = true;
  }
  return range(left, right);
};
function removeMatches(updatedGrid, size, start, end) {
  let isValid = false;
  const matches = {};
  matches["startH"] = {
    i: start.i,
    j: findAdjacentTiles(start.j, [...updatedGrid[start.i]], size),
  };
  let row = [];
  updatedGrid.map((item) => {
    row.push(item[start.j]);
  });
  matches["startV"] = {
    i: start.j,
    j: findAdjacentTiles(start.i, row, size),
  };
  matches["endH"] = {
    i: end.i,
    j: findAdjacentTiles(end.j, [...updatedGrid[end.i]], size),
  };
  row = [];
  updatedGrid.map((item) => {
    row.push(item[end.j]);
  });
  matches["endV"] = {
    i: end.j,
    j: findAdjacentTiles(end.i, row, size),
  };
  if (matches["startH"].j.length >= 3) {
    isValid = true;
    for (
      let k = matches["startH"].j[0];
      k <= matches["startH"].j[matches["startH"].j.length - 1];
      k++
    ) {
      switch (matches["startH"].j.length) {
        case 4:
          updatedGrid[start.i][k] =
            k !== start.j ? "" : `striped-vertical-${updatedGrid[start.i][k]}`;
          break;
        case 3:
          updatedGrid[start.i][k] = "";
          break;
      }
    }
  }
  if (matches["startV"].j.length >= 3) {
    isValid = true;
    for (
      let k = matches["startV"].j[0];
      k <= matches["startV"].j[matches["startV"].j.length - 1];
      k++
    ) {
      // updatedGrid[k][start.j] = "striped-horizontal-red";
      switch (matches["startV"].j.length) {
        case 4:
          updatedGrid[k][start.j] =
            k !== start.i
              ? ""
              : `striped-horizontal-${updatedGrid[k][start.j]}`;
          break;
        case 3:
          updatedGrid[k][start.j] = "";
          break;
      }
    }
  }
  if (matches["endH"].j.length >= 3) {
    isValid = true;
    for (
      let k = matches["endH"].j[0];
      k <= matches["endH"].j[matches["endH"].j.length - 1];
      k++
    ) {
      // updatedGrid[end.i][k] = "striped-horizontal-red";
      switch (matches["endH"].j.length) {
        case 4:
          updatedGrid[end.i][k] =
            k !== end.j ? "" : `striped-vertical-${updatedGrid[end.i][k]}`;
          break;
        case 3:
          updatedGrid[end.i][k] = "";
          break;
      }
    }
  }
  if (matches["endV"].j.length >= 3) {
    isValid = true;
    for (
      let k = matches["endV"].j[0];
      k <= matches["endV"].j[matches["endV"].j.length - 1];
      k++
    ) {
      // updatedGrid[k][end.j] = "striped-horizontal-red";
      switch (matches["endV"].j.length) {
        case 4:
          updatedGrid[k][end.j] =
            k !== end.i ? "" : `striped-horizontal-${updatedGrid[k][end.j]}`;
          break;
        case 3:
          updatedGrid[k][end.j] = "";
          break;
      }
    }
  }
  return { isValid, updatedGrid2: [...updatedGrid] };
}

const App = () => {
  const [size, setSize] = useState(8);

  const [grid, setGrid] = useState(
    Array.from({ length: size }, () =>
      Array.from({ length: size }, () => colors[Math.floor(Math.random() * 6)])
    )
  );
  // const [grid, setGrid] = useState([
  //   ["yellow", "yellow", "blue", "orange", "green", "blue", "yellow", "orange"],
  //   ["green", "blue", "yellow", "yellow", "blue", "orange", "green", "green"],
  //   [
  //     "purple",
  //     "blue",
  //     "orange",
  //     "orange",
  //     "yellow",
  //     "purple",
  //     "green",
  //     "green",
  //   ],
  //   ["purple", "green", "purple", "orange", "red", "purple", "blue", "red"],
  //   ["blue", "red", "orange", "red", "blue", "orange", "yellow", "purple"],
  //   ["blue", "yellow", "orange", "red", "green", "purple", "purple", "yellow"],
  //   [
  //     "red",
  //     "orange",
  //     "purple",
  //     "purple",
  //     "green",
  //     "purple",
  //     "purple",
  //     "orange",
  //   ],
  //   ["blue", "red", "orange", "orange", "purple", "red", "yellow", "orange"],
  // ]);
  useEffect(() => {
    let updatedGrid = [];
    grid.map((item) => {
      updatedGrid.push([...item]);
    });
    removeDuplicates(updatedGrid, size);
    updatedGrid = replaceTile(updatedGrid, size, [...colors]);
    setGrid(updatedGrid);
  }, []);
  const updateGrid = (start, end) => {
    let updatedGrid = [];
    let backupGrid = [];
    grid.map((item) => {
      updatedGrid.push([...item]);
      backupGrid.push([...item]);
    });
    let temp = updatedGrid[start.i][start.j];
    updatedGrid[start.i][start.j] = updatedGrid[end.i][end.j];
    updatedGrid[end.i][end.j] = temp;
    const { isValid, updatedGrid2 } = removeMatches(
      updatedGrid,
      size,
      start,
      end
    );
    if (isValid) setGrid(updatedGrid2);
  };
  const moveBoxesDown = (displacedBoxes) => {
    let updatedGrid = [...grid];
    displacedBoxes.map((item) => {
      let temp = updatedGrid[item.originalRow][item.fixedColumn];
      updatedGrid[item.originalRow][item.fixedColumn] =
        updatedGrid[item.finalRow][item.fixedColumn];
      updatedGrid[item.finalRow][item.fixedColumn] = temp;
    });
    setGrid(updatedGrid);
    setTimeout(() => {
      removeDuplicates(updatedGrid, size);
      updatedGrid = replaceTile(updatedGrid, size, [...colors]);
      setGrid(updatedGrid);
    }, 1000);
  };
  console.log(grid, "ahoy");
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Grid
          gridComponent={grid}
          gridSize={size}
          updateGrid={updateGrid}
          moveBoxesDown={moveBoxesDown}
        />
      </div>
    </div>
  );
};

export default App;
