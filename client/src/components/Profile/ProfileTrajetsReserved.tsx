import React, { useContext, useState } from "react";
import Grid from "./Grid.tsx";
import { useFetch } from "../../hooks/fetch/useFetch.tsx";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import { Car, Position, Trajet } from "../../utils/type-interfaces.ts";
import TrajetEdit from "./TrajetEdit.tsx";
import { redirect } from "react-router-dom";
import { set } from "react-hook-form";
import TrajetCreate from "./TrajetCreate.tsx";

const ProfileTrajetsReserved = () => {
  const user = useContext(AuthContext).user;

  let { data, loading, error } : {data: Trajet[] | undefined,loading: boolean | undefined, error: any} = useFetch({
    url: `reservation/${user?.id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.apiKey}`,
    },
  });

  data === undefined ? data = [] : data = data;

 
  const filteredData = () => {
    return data?.map((trajet) => {
      const {
        id,
        position_start,
        position_end,
        start_date,
        hour_start,
        price,
        nb_place,
      } = trajet;
      return {
        id,
        position_start: position_start.name,
        position_end: position_end.name,
        start_date,
        hour_start,
        price,
        nb_place,
      };
    });
  };

 
  return (
    <main className="trajets-created-wrapper">
      <nav className="header">
        <div className="left-part">
          <h1>Mes Réservations</h1>
          <p>Votre liste de réservations</p>
        </div>

        <div className="right-part"></div>
      </nav>

      <div className="grid-trajets-wrapper">
        {loading && <div>Chargement...</div>}
        {error && <div>Erreur lors du chargement des trajets</div>}
        {data && (
          <Grid
            header={[
              "Départ",
              "Arrivée",
              "Date",
              "Heure",
              "Prix Total",
              "Places reserves",
              "Actions",
            ]}
            data={data}
            filteredData={filteredData()}
            limit={3}
            actions={[
              {
                onClick: (trajet: Trajet) => console.log("REMOVE", trajet.id),
                label: "Remove",
                class: "bg-custom-green text-white",
              },
            ]}
          />
        )}
      </div>
    </main>
  );
};

export default ProfileTrajetsReserved;
