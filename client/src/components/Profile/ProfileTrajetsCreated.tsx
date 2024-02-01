import React, { useContext, useEffect, useState } from "react";
import Grid from "./Grid.tsx";
import { useFetch } from "../../hooks/fetch/useFetch.tsx";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import { Car, Position, Trajet, UserTypes } from "../../utils/type-interfaces.ts";
import TrajetEdit from "./TrajetEdit.tsx";
import { redirect, useNavigate } from "react-router-dom";
import { set } from "react-hook-form";
import TrajetCreate from "./TrajetCreate.tsx";
import { errorToast, successToast } from "../../utils/helpers.ts";
import { fetchFnc } from "../../utils/fetch.js";

const ProfileTrajetsCreated = ({create = false}) => {
  const user = useContext(AuthContext).user;
  const navigate = useNavigate();
  const [trajetEdit, setTrajetEdit] = useState<Trajet | null>(null);
  const [trajetCreate, setTrajetCreate] = useState<boolean>(create);
    
  useEffect(() => {
    if (!user || user.type !== UserTypes.CHAUFFEUR) {
      errorToast("Vous n'êtes pas autorisé à accéder à cette page");
      navigate("/");
    }
  }, [trajetEdit, trajetCreate, create]);

  

  let {
    data,
    loading,
    error,
  }: { data: Trajet[] | undefined; loading: boolean | undefined; error: any } =
    useFetch({
      url: `trajet/user/${user?.id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.apiKey}`,
      },
    });
  
 
  
    


  

  data = data || [];
  console.log("🚀 ~ ProfileTrajetsCreated ~ data:", data)
  
  const displayTitle = () => {
    if (trajetEdit === null && !trajetCreate) {
      return <p>Votre liste de trajets crées</p>;
    } else if (trajetEdit !== null) {
      return <p>Modification du trajet</p>;
    } else if (trajetCreate) {
      return <p>Création d'un nouveau trajet</p>;
    }
  };


  const filteredData = () => {

    return data?.map((trajet) => {
      const { id, position_start, position_end, start_date, hour_start, price, nb_place } = trajet;
      //TODO : change position_start and position_end to position_start.name and position_end.name + change price to price + "€"
      console.log(
        "🚀 ~ ProfileTrajetsCreated ~ position_end ~ trajet",
        position_end
      );

      return {
        position_start: position_start.name,
        position_end: position_end.name,
        start_date,
        hour_start,
        price: `500 DZD`,
        nb_place,
      };
    });
  }

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
        {data && trajetEdit === null && !trajetCreate && (
          <Grid
            limit={6}
            data={data}
            header={["Départ", "Arrivée", "Date", "Heure", "Prix", "Places disponibles", "Actions"]}
            filteredData={filteredData()}
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
                onClick: async (trajet: Trajet) =>  {

                  if (window.confirm("Etes vous sur de vouloir supprimer ce trajet ?")) {
                  
                    const formData = new FormData();
                    console.log("trajet"ntrajet);
                    
                    formData.append("chauffeur_id",trajet.?chauffeur?.id);
                    try {
                      await fetchFnc({
                        url: `trajet/delete/${trajet?.id}`,
                        data: formData,
                        method: "DELETE",
                        headers: {  
                          Authorization: `Bearer ${user?.apiKey}`,
                        }
                      });
                      successToast("Trajet supprimé avec succès");
                     } catch(e) {
                       errorToast(e);
                     }
                  }
                },
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
