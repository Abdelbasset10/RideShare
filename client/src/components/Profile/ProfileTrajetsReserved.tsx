import React, { useContext, useState } from "react";
import Grid from "./Grid.tsx";
import { useFetch } from "../../hooks/fetch/useFetch.tsx";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import { Car, Position, Reservation, Trajet } from "../../utils/type-interfaces.ts";
import TrajetEdit from "./TrajetEdit.tsx";
import { redirect } from "react-router-dom";
import { set } from "react-hook-form";
import TrajetCreate from "./TrajetCreate.tsx";
import { fetchFnc } from "../../utils/fetch.js";
import { errorToast, successToast } from "../../utils/helpers.ts";

const ProfileTrajetsReserved = () => {
  const user = useContext(AuthContext).user;

  let { data, loading, error } : {data: Reservation[] | undefined,loading: boolean | undefined, error: any} = useFetch({
    url: `reservation/${user?.id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.apiKey}`,
    },
  });

  data === undefined ? data = [] : data = data?.map((e) => {
    if (e.nb_place <= 0) return null
    return e
  }).filter(Boolean);


 
  const filteredData = () => {
    
    return data?.map((reservation) => {
      
      
      const {nb_place,trajet} = reservation;
      console.log("nb_place",nb_place);
      
      
      const price = trajet.price * nb_place;
      const {id,start_date,hour_start} = trajet

      if (nb_place <= 0) return null;

      return {
        position_start: trajet.position_start.name,
        position_end: trajet.position_end.name,
        start_date,
        hour_start,
        price,
        nb_place,
      };
    }).filter(Boolean);
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
<<<<<<< HEAD
                onClick: (trajet: Trajet) => console.log("REMOVE", trajet.id),
                label: "Remove",
                class: "bg-custom-green text-white",
=======
                onClick: (reservation: Reservation) => {
                  fetchFnc({
                    url: `reservation/${reservation.id}`,
                    method: "PATCH",
                    headers: {
                      Authorization: `Bearer ${user?.apiKey}`,
                    },
                    data: {
                      userId: user.id,
                      nb_places: 0
                    }
                  }).then((success) => successToast("Reservation annulée avec succees")).catch((err) => errorToast(err));
                },
                label: "Annuler",
                class: "bg-red-700 text-white",
>>>>>>> 13de46f5f795b50124081ae99ac16a649cad7fb6
              },
            ]}
          />
        )}
      </div>
    </main>
  );
};

export default ProfileTrajetsReserved;
