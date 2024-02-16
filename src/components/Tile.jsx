import React from "react";

const Tile = ({ color, index, updateStartDragIndex, updateEndDragIndex }) => {
  return (
    <div
      className={`tile ${color}`}
      key={index}
      index={index}
      draggable
      onDragStart={() => {
        updateStartDragIndex(index);
      }}
      onDrop={() => {
        updateEndDragIndex(index);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      style={
        {
          // ...(boxesToMoveDown > 0
          //   ? {
          //       transform: `translateY(${heightToMoveDown}px)`,
          //       transition: `transform 1s`,
          //     }
          //   : {}),
        }
      }
    >
      <p>{index}</p>
    </div>
  );
};

export default Tile;
