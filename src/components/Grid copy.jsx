import React, { useState, useEffect, useRef } from "react";
import { keyframes } from "styled-components";

const Tile = (props) => props.render();

function findEmptySlotsBelow(gridComponent, column, row_index) {
  const originalRow = row_index;
  let slotsCounter = 0;
  if (
    (row_index + 1 < gridComponent.length &&
      gridComponent[row_index + 1][column] != "") ||
    row_index == gridComponent.length - 1 ||
    gridComponent[row_index][column] == ""
  )
    return { slotsCounter: 0 };
  while (
    row_index + 1 < gridComponent.length &&
    gridComponent[row_index + 1][column] == ""
  ) {
    row_index += 1;
    slotsCounter += 1;
  }
  return {
    boxesToMoveDown: slotsCounter,
    fixedColumn: column,
    originalRow,
    finalRow: row_index,
  };
}

const Grid = ({ gridComponent, gridSize, updateGrid, moveBoxesDown }) => {
  const ref = useRef(null);
  const tileSize = Math.floor(100 / gridSize);
  const [display, setDisplay] = useState(<></>);
  const [start, setStart] = useState({
    i: null,
    j: null,
  });
  const [end, setEnd] = useState({
    i: null,
    j: null,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [displacedBoxesInGrid, setDisplacedBoxesInGrid] = useState([]);
  useEffect(() => {
    if (!isDragging) {
      setStart({
        i: null,
        j: null,
      });
      setEnd({
        i: null,
        j: null,
      });
    } else {
      // check if the tile has been moved only one index horizontally or vertically
      if (
        (start.i === end.i && (start.j == end.j - 1 || start.j == end.j + 1)) ||
        (start.j === end.j && (start.i === end.i - 1 || start.i === end.i + 1))
      ) {
        updateGrid(start, end);
      }
      setIsDragging(false);
    }
  }, [isDragging]);
  useEffect(() => {
    const rows = [];
    let displacedBoxes = [];
    for (let column = 0; column < gridSize; column++) {
      rows.push(
        <div className="row">
          {gridComponent.map((row, row_index) => {
            const { boxesToMoveDown, fixedColumn, originalRow, finalRow } = {
              ...findEmptySlotsBelow(gridComponent, column, row_index),
            };
            if (boxesToMoveDown > 0)
              displacedBoxes.push({ fixedColumn, originalRow, finalRow });
            const heightToMoveDown =
              (tileSize / 100) * boxesToMoveDown * ref.current.clientHeight;
            return (
              <Tile
                key={`${column}-${row_index}`}
                render={() => (
                  <div
                    className={`tile ${row[column]}`}
                    style={{
                      height: `${tileSize}%`,
                      ...(boxesToMoveDown > 0
                        ? {
                            transform: `translateY(${heightToMoveDown}px)`,
                            transition: `transform 1s`,
                          }
                        : {}),
                    }}
                    draggable
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDragStart={(e) => {
                      setStart({
                        i: row_index,
                        j: column,
                      });
                    }}
                    onDrop={(e) => {
                      setEnd({
                        i: row_index,
                        j: column,
                      });
                      setIsDragging(true);
                    }}
                  >
                    <p>&nbsp;&nbsp;</p>
                  </div>
                )}
              />
            );
          })}
        </div>
      );
    }
    setDisplay(rows);
    setDisplacedBoxesInGrid(displacedBoxes);
  }, [gridComponent]);
  useEffect(() => {
    if (displacedBoxesInGrid.length > 0) {
      const timer = setInterval(() => {
        moveBoxesDown(displacedBoxesInGrid);
        setDisplacedBoxesInGrid([]);
      }, 200);
      return () => clearInterval(timer);
    }
  }, [displacedBoxesInGrid]);
  return (
    <div className="grid" ref={ref}>
      {display}
    </div>
  );
};

export default Grid;
