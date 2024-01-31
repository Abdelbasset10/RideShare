import React, { useState } from "react";
import { Trajet, GridActionsButtons } from "../../utils/type-interfaces";
import precedentIcon from "../../assets/img/icons/icon_arrow_precedent.png";
import nextIcon from "../../assets/img/icons/icon_arrow_next.png";


interface GridProps {
  header: string[];
  data : any[];
  actions: GridActionsButtons[];
  limit?: number;
}
const TrajetsGrid = ({ data, header,actions, limit = 10 }: GridProps) => {
  const pageNumbers = data.length / limit;

  const [page, setPage] = useState(1);

  const nextPage = () => {
    if (page < pageNumbers) {
      setPage(page + 1);
    }
  };

  const precedentPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const displayData = () => {
    const start = (page - 1) * limit;
    const end = start + limit;

    if (data.length === 0) return [];
    return data.slice(start, end);
  };

  return (
    <table className="grid-trajets">
      <thead>
        <tr>
          {header &&
            header.map((title) => {
              return <th key={title}>{title}</th>;
            })}
        </tr>
      </thead>

      <tbody>
        {displayData().map((trajet) => {
          let arr = Object.entries(trajet);

          const thArr = arr.map(([key, value]) => {
            return <th key={key}>{value}</th>;
          });

          return (
            <tr>
              {thArr}
              <th>
                {actions.map((action) => (
                  <button
                    key={action.label}
                    className={action.class}
                    onClick={() => action.onClick(trajet)}
                  >
                    {action.label}
                  </button>
                ))}
              </th>
              
            </tr>
          );
        })}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan={7}>
            <div className="pagination">
              <p>
                {(page - 1) * limit + 1} - {page * limit} of {data.length}
              </p>
              <img src={precedentIcon} alt="Left" onClick={precedentPage} />
              <img src={nextIcon} alt="Right" onClick={nextPage} />
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default TrajetsGrid;
