import React from "react";

//import { generateBoard } from "utils";

const Board: React.FC = (props) => {
  console.log("props", props);

  // useEffect(() => {
  //   if (props) {
  //     generateBoard(props);
  //   }
  // }, [props]);

  return (
    <div>
      <h1>Board</h1>
      <div id="table"></div>
    </div>
  );
};

export default Board;
