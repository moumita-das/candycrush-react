import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { generateBoard } from "./helpers/generators";
import Tile from "./components/Tile";
import { matchExists } from "./helpers/utilities";

const App = () => {
  const [grid, setGrid] = useState(null);
  useEffect(() => {
    setGrid(generateBoard());
  }, []);
  useEffect(() => {
    if (!grid) return;
    matchExists(grid);
  }, [grid]);
  console.log(grid);
  const board = [];
  let row = [];
  grid?.map((item, index) => {
    row.push(<Tile color={item.color} index={item.index} />);
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
