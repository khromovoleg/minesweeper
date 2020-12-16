interface FormData {
  [key: string]: number;
}

export const generateBoard = (data: FormData): void => {
  if (data) {
    const { rows, cols, mines } = data;
    const count_rows = rows;
    const count_cols = cols;
    const count_mines = mines;
    const table = document.createElement("div");
    table.className = "table";

    // generate mines
    const minesArray = [];
    for (let i = 0; i < count_mines; i++) {
      const new_mine = { row: 0, col: 0 };
      let new_mine_valid = false;
      while (!new_mine_valid) {
        new_mine.row = Math.floor(Math.random() * count_rows);
        new_mine.col = Math.floor(Math.random() * count_cols);
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
    }

    //console.log(minesArray);
    // generate grid
    table.innerHTML = "";
    for (let r = 0; r < count_rows; r++) {
      const tr = document.createElement("div");
      tr.className = "table__row";
      for (let c = 0; c < count_cols; c++) {
        let contains_mine = false;
        for (let j = 0; j < minesArray.length; j++) {
          if (minesArray[j].row == r && minesArray[j].col == c)
            contains_mine = true;
        }
        if (contains_mine) {
          const td = document.createElement("div");
          td.className = "table__cell";
          const cell = document.createTextNode("M");
          td.appendChild(cell);
          tr.appendChild(td);
          //console.log("td", td);
          //console.log("cell", cell);
        } else {
          // calculate number of ajacent mines
          let number = 0;
          for (let a = r - 1; a <= r + 1; a++) {
            for (let b = c - 1; b <= c + 1; b++) {
              for (let j = 0; j < minesArray.length; j++) {
                if (minesArray[j].row === a && minesArray[j].col === b)
                  number++;
              }
            }
          }
          if (number == 0) {
            const td = document.createElement("div");
            td.className = "table__cell";
            const cell = document.createTextNode("&nbsp;");
            td.appendChild(cell);
            tr.appendChild(td);
          } else {
            const td = document.createElement("div");
            td.className = "table__cell";
            const cell = document.createTextNode(number.toString());
            td.appendChild(cell);
            tr.appendChild(td);
          }
        }
      }
      table.appendChild(tr);
    }

    const tableWrap = document.getElementById("table");

    if (tableWrap) {
      tableWrap.innerHTML = "";
      tableWrap.appendChild(table);
    }
  }
};
