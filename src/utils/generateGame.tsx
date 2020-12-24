export const generateGame = (props: any) => {
  const { rows, cols, mines } = props;

  const valueCells = {
    opened: false,
    mine: false,
    number: null,
    flag: false,
  };

  const cellsArray: any = [];
  for (let i = 0; i < rows; i++) {
    cellsArray[i] = [];

    for (let j = 0; j < cols; j++) {
      cellsArray[i][j] = valueCells;
    }
  }

  // generate mines
  const minesArray = [];
  for (let i = 0; i < mines; i++) {
    const new_mine = { row: 0, col: 0 };
    let new_mine_valid = false;
    while (!new_mine_valid) {
      new_mine.row = Math.floor(Math.random() * rows);
      new_mine.col = Math.floor(Math.random() * cols);
      new_mine_valid = true;
      for (let j = 0; j < minesArray.length; j++) {
        if (
          minesArray[j].row == new_mine.row &&
          minesArray[j].col == new_mine.col
        )
          new_mine_valid = false;
      }
    }
    minesArray.push(new_mine);
    cellsArray[new_mine.row][new_mine.col] = { ...valueCells, mine: true };
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!cellsArray[r][c].mine) {
        // calculate number of ajacent mines
        let number = 0;
        for (let a = r - 1; a <= r + 1; a++) {
          for (let b = c - 1; b <= c + 1; b++) {
            for (let j = 0; j < minesArray.length; j++) {
              if (minesArray[j].row === a && minesArray[j].col === b) number++;
            }
          }
        }
        cellsArray[r][c] = { ...valueCells, number: number.toString() };
      }
    }
  }

  return {
    board: cellsArray,
    mines: minesArray,
  };
};
