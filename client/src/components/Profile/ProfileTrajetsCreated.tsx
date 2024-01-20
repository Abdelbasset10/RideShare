import React, { useContext, useState } from "react";
import TrajetsGrid from "./TrajetsGrid.tsx";
import { useFetch } from "../../hooks/fetch/useFetch.jsx";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import { Car, Position, Trajet } from "../../utils/type-interfaces.ts";
import TrajetEdit from "./TrajetEdit.tsx";
import { redirect } from "react-router-dom";
import { set } from "react-hook-form";
import TrajetCreate from "./TrajetCreate.tsx";

const ProfileTrajetsCreated = () => {
  const user = useContext(AuthContext).user;

  const [trajetEdit, setTrajetEdit] = useState<Trajet | null>(null);
  const [trajetCreate, setTrajetCreate] = useState<boolean>(false);

  const position: Position = {
    id: "1",
    latitude: "151",
    longitude: "151",
    start_trajets: [],
    end_trajets: [],
    name: "Paris",
  };
  const car: Car = {
    id: "1",
    marque: "BMW",
    model: "X5",
    max_places: 5,
    owner: user,
    trajets: [],
    matricule: "15151-115-16",
    year: "2015",
  };

  const loading = false;
  const error = false;
  const trajets: Trajet[] = [
    {
      id: "1",
      position_start: position,
      position_end: position,
      start_date: "2021-03-01",
      hour_start: "12:00",
      price: 10,
      nb_place: 2,
      reservations: [],
      chauffeur: user,
      car: car,
    },
    {
      id: "2",
      position_start: position,
      position_end: position,
      start_date: "2021-03-01",
      hour_start: "12:00",
      price: 10,
      nb_place: 2,
      reservations: [],
      chauffeur: user,
      car: car,
    },
    {
      id: "3",
      position_start: position,
      position_end: position,
      start_date: "2021-03-01",
      hour_start: "12:00",
      price: 10,
      nb_place: 2,
      reservations: [],
      chauffeur: user,
      car: car,
    },
    {
      id: "4",
      position_start: position,
      position_end: position,
      start_date: "2021-03-01",
      hour_start: "12:00",
      price: 10,
      nb_place: 2,
      reservations: [],
      chauffeur: user,
      car: car,
    },
    {
      id: "5",
      position_start: position,
      position_end: position,
      start_date: "2021-03-01",
      hour_start: "12:00",
      price: 10,
      nb_place: 2,
      reservations: [],
      chauffeur: user,
      car: car,
    },
    {
      id: "6",
      position_start: position,
      position_end: position,
      start_date: "2021-04-01",
      hour_start: "12:00",
      price: 10,
      nb_place: 2,
      reservations: [],
      chauffeur: user,
      car: car,
    },
  ];

  //const { loading, value, error } = useFetch(`trajets/created/${user?.id}`);

  const displayTitle = () => {
    if (trajetEdit === null && !trajetCreate) {
      return <p>Votre liste de trajets crées</p>;
    } else if (trajetEdit !== null) {
      return <p>Modification du trajet</p>;
    } else if (trajetCreate) {
      return <p>Création d'un nouveau trajet</p>;
    }
  };
  return (
    <main className="trajets-created-wrapper">
      <nav className="header">
        <div className="left-part">
          <h1>Mes Trajets</h1>
          {displayTitle()}
        </div>

        <div className="right-part">
          <button
            className="add-trajet-btn"
            onClick={() => {
              if (trajetCreate || trajetEdit) {
                setTrajetCreate(false);
                setTrajetEdit(null);
              } else {
                setTrajetCreate(true);
                setTrajetEdit(null);
              }
            }}
          >
            {trajetCreate || trajetEdit
              ? "Retour"
              : "Ajouter un nouveau trajet"}
          </button>
        </div>
      </nav>

      <div className="grid-trajets-wrapper">
        {loading && <div>Chargement...</div>}
        {error && <div>Erreur lors du chargement des trajets</div>}
        {trajets && trajetEdit === null && !trajetCreate && (
          <TrajetsGrid
            limit={3}
            trajets={trajets}
            actions={[
              {
                onClick: (trajet: Trajet) => {
                  setTrajetEdit(trajet);
                  setTrajetCreate(false);
                },
                label: "Edit",
                class: "bg-blue-400 text-white",
              },
              {
                onClick: (trajet: Trajet) => console.log("REMOVE", trajet.id),
                label: "Remove",
                class: "bg-red-700 text-white",
              },
            ]}
          />
        )}

        {trajetEdit && !trajetCreate && <TrajetEdit trajet={trajetEdit} />}
        {!trajetEdit && trajetCreate && <TrajetCreate />}
      </div>
    </main>
  );
};

export default ProfileTrajetsCreated;
