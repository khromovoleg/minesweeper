export const checkWinner = (board: any) => {
  const rows = board.length;
  const cols = board[0].length;
  let result = true;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = board[i][j];
      if (cell.opened === false && cell.mine === false) {
        result = false;
        break;
      }
    }
  }

  return result;
};
