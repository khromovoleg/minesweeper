import React from "react";

//import { useDispatch } from "react-redux";
import classnames from "classnames";

//import { actions } from "store/actions";
// import { Table } from "components/Table";
// import { Row } from "components/Table";
// import { Cell } from "components/Table";
// interface FormData {
//   [key: string]: number;
// }

interface MyProps {
  board: any;
  handleClickCell: any;
}

export const GenerateBoard: React.FC<MyProps> = ({
  board,
  handleClickCell,
}: MyProps) => {
  //const dispatch = useDispatch();

  const CreateTable = () => {
    return (
      <>
        {board.map((objRow: any, i: any) => {
          return (
            <div key={i} className="table__row">
              {objRow.map((objCell: any, j: any) => {
                const cellClass = classnames({
                  table__cell: true,
                  "table__cell--mine": objCell.mine,
                  "table__cell--n": objCell.number && objCell.number !== "0",
                  [`table__cell--n-${objCell.number}`]:
                    objCell.number && objCell.number !== "0",
                });
                return (
                  <div
                    key={`${i}-${j}`}
                    className={cellClass}
                    data-cell={`${i}-${j}`}
                    onClick={handleClickCell}
                    onContextMenu={handleClickCell}
                  />
                );
              })}
            </div>
          );
        })}
      </>
    );
  };

  return <div className="table">{CreateTable()}</div>;
};
