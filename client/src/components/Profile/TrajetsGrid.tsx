import React, { useState } from "react";
import { Trajet, TrajetsGridActionsButtons } from "../../utils/type-interfaces";

interface TrajetsGridProps {
  trajets: Trajet[];
  actions: TrajetsGridActionsButtons[];
  limit?: number;
}
const TrajetsGrid = ({ trajets, actions, limit = 10 }: TrajetsGridProps) => {
  const pageNumbers = trajets.length / limit;

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

  const displayTrajets = () => {
    const start = (page - 1) * limit;
    const end = start + limit;

    if (trajets.length === 0) return [];
    return trajets.slice(start, end);
  };

  return (
    <table className="grid-trajets">
      <thead>
        <tr>
          <th>Depart</th>
          <th>Lieu Arrivée</th>
          <th>Date Départ</th>
          <th>Heure Départ</th>
          <th>Prix</th>
          <th>Place(s) restante(s)</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {displayTrajets().map((trajet) => (
          <tr key={trajet.id}>
            <th>{trajet.position_start.name}</th>
            <th>{trajet.position_end.name}</th>
            <th>{trajet.start_date}</th>
            <th>{trajet.hour_start}</th>
            <th>{trajet.price}</th>
            <th>{trajet.nb_place}</th>
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
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan={7}>
            <div className="pagination">
              <p>
                {(page - 1) * limit + 1} - {page * limit} of {trajets.length}
              </p>
              <img src="#" alt="Left" onClick={precedentPage} />
              <img src="#" alt="Right" onClick={nextPage} />
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default TrajetsGrid;
