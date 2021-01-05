import React from "react";

import classnames from "classnames";

interface MyProps {
  board: any;
  handleClickCell: any;
}

export const Table: React.FC<MyProps> = ({
  board,
  handleClickCell,
}: MyProps) => {
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
                  "table__cell--open": objCell.opened,
                  "table__cell--flag": objCell.flag,
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

export default Table;
