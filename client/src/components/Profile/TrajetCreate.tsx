/*import React from "react";

const TrajetCreate = () => {
  return <div>Creation TRajet</div>;
};

export default TrajetCreate;*/
import React, { useEffect, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useController,
  useForm,
} from "react-hook-form";
import { z, string, optional } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/auth/useAuth";

const TrajetCreate = () => {
  const { user } = useAuth();

  const [activePanel, setActivePanel] = useState(1);

  const { register, handleSubmit, control, formState } = useForm({});

  const { field: userTypeField } = useController({ name: "type", control });

  const onUserTypeChange = (event) => {
    userTypeField.onChange(event.target.value);
  };

  const handlePanelChange = (panelNumber) => {
    setActivePanel(panelNumber);
  };

  const { field: maxPlaceField } = useController({
    name: "vehicleMaxPlace",
    control,
  });
  const { errors } = formState;
  const yearMax = new Date().getFullYear();

  const onUserEdit = (data) => {
    console.log("🚀 ~ onUserEdit ~ data:", data);
  };

  return (
    <div className="profile-account-wrapper">
   
      {(activePanel === 1 || activePanel === 2) && (
        <form
          className="profile-account-form"
          onSubmit={handleSubmit(onUserEdit)}
        >
          {activePanel === 1 && (
            <div className="account-profile-informations-wrapper ">
              <div className="w-full">
                

                <hr className="w-full border my-4" />
                <div className="form-row grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="Lieu_depart">Lieu de Départ:</label>
                    <input
                      id="Lieu_depart"
                      type="text"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Lieu_arrivee">Lieu d'Arrivé:</label>
                    <input
                      id="Lieu_arrivee"
                      type="text"
                    
                    />
                  </div>
                </div>

                <div className="form-row grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="Date_depart">Date de Départ:</label>
                    <input id="Date_depart" type="Date_depart" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="heure_depart">l'Heure de Départ:</label>
                    <input type="text" id="heure_depart"  />
                  </div>
                </div>

                <div className="form-row grid-cols-2">
                <div className="form-group">
                    <label htmlFor="place_dispo">Places Disponibles:</label>
                    <input id="place_dispo" type="place_dispo" />
                  </div>
                <div className="form-group">
                    <label htmlFor="prix">Prix:</label>
                    <input id="prix" type="prix" />
                </div>

          
                </div>


              </div>

              <button
                className="bg-orange text-white rounded-md px-2.5 py-1"
                type="submit"
              >
                Ajouter
              </button>
              <button
                className="bg-orange text-white rounded-md px-2.5 py-1"
                type="submit"
              >
                Annuler
              </button>
            </div>
          )}

          
        </form>
      )}

      
    </div>
  );
};

export default TrajetCreate;

