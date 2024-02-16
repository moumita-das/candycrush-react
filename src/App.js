import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { generateBoard } from "./helpers/generators";
import Tile from "./components/Tile";
import { isValidMove, matchExists, removeMatches } from "./helpers/utilities";

const App = () => {
  const [grid, setGrid] = useState(null);
  const [boardChanged, setBoardChanged] = useState(false);
  const [startDragIndex, setStartDragIndex] = useState(null);
  const [endDragIndex, setEndDragIndex] = useState(null);
  const updateStartDragIndex = (index) => {
    setStartDragIndex(index);
  };
  const updateEndDragIndex = (index) => {
    setEndDragIndex(index);
  };
  const moveTriggered = () => {
    const { validMove, updatedGrid } = isValidMove(
      JSON.parse(JSON.stringify(grid)),
      startDragIndex,
      endDragIndex
    );
    console.log(validMove);
    console.log(updatedGrid);
    if (validMove) setGrid(updatedGrid);
    setStartDragIndex(null);
    setEndDragIndex(null);
  };
  console.log(grid);
  useEffect(() => {
    if (!grid) return;
    let updatedGrid = JSON.parse(JSON.stringify(grid));

    while (true) {
      let { horizontalMatches, verticalMatches } = matchExists(updatedGrid);
      console.log(horizontalMatches, verticalMatches);
      if (horizontalMatches.length === 0 && verticalMatches.length === 0) break;
      updatedGrid = removeMatches(
        updatedGrid,
        horizontalMatches,
        verticalMatches,
        boardChanged
      );
      setGrid(updatedGrid);
    }
  }, [grid]);
  useEffect(() => {
    if (boardChanged || !startDragIndex) return;
    setBoardChanged(true);
  }, [startDragIndex]);
  useEffect(() => {
    if (boardChanged && startDragIndex && endDragIndex) moveTriggered();
  }, [endDragIndex]);
  useEffect(() => {
    setGrid(generateBoard());
  }, []);
  // console.log(grid);
  const board = [];
  let row = [];
  grid?.map((item, index) => {
    row.push(
      <Tile
        color={item.color}
        index={item.index}
        updateStartDragIndex={updateStartDragIndex}
        updateEndDragIndex={updateEndDragIndex}
        moveTriggered={moveTriggered}
      />
    );
    if ((index + 1) % 8 == 0) {
      board.push(row);
      row = [];
    }
  });

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="grid">
          {board.map((row, index) => (
            <div className="row">{row}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
