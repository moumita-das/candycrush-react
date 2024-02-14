import React from "react";

const Tile = ({ color, index }) => {
  return (
    <div
      className={`tile ${color}`}
      key={index}
      index={index}
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
