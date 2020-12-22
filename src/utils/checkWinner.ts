export const checkWinner = (board: any, mines: any) => {
  const rows = board.length;
  const cols = board[0].length;
  let result = true;

  // for (let i = 0; i < mines.length; i++) {
  //   const mine = mines[i];
  //   const cell = board[mine.row][mine.col];
  //   if (cell.flag === false) {
  //     result = false;
  //   }
  // }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = board[i][j];
      console.log("cell", cell);
      if (cell.opened === false && cell.mine === false) {
        result = false;
        break;
      }
      if (cell.mine === true && cell.flag !== true) {
        result = false;
        break;
      }
    }
  }

  return result;
};
