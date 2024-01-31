
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
import Remplir from '../../assets/img/icons/Remplir.png';
import destionationIcon from "../../assets/img/icons/icon_destination.png";
import ResearchBarMap from "../ResearchBarMap";


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

  const [departCoord, setDepartCoord] = useState(null);
  const [isDepartMapOpen, setIsDepartMapOpen] = useState(false);
  const DefaultLocation = { lat: 36.75, lng: 3.05 };

  


  return (
    <div className="profile-account-wrapper">
      
    <div className="font-bold text-2xl w-17 h-10 flex justify-center items-center"> 
        <img className="w-12"src={Remplir} alt="Remplir icon" />
        <p>Veuiller Remplir les Champs Suivants</p> 
        </div>
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
                      
                     
                      <img src={destionationIcon} alt="Destination" />

                      <div className="research-input">
                        <p
                          className="cursor-pointer"
                          onClick={() => setIsDepartMapOpen(true)}
                        >
                          {departCoord
                            ? `${departCoord?.lng.toFixed(3)}, ${departCoord.lat.toFixed(3)}`
                            : "Depart"}
                        </p>
                        {isDepartMapOpen && (
                          <ResearchBarMap
                            defaultLoc={DefaultLocation}
                            setCoord={setDepartCoord}
                            coord={departCoord}
                            setIsMapOpen={setIsDepartMapOpen}
                          />
                        )}
                      </div>

                  
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
                    <input id="Date_depart" type="text" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="heure_depart">l'Heure de Départ:</label>
                    <input type="text" id="heure_depart"  />
                  </div>
                </div>

                <div className="form-row grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="place_dispo">Places Disponibles:</label>
                    <input id="place_dispo" type="text" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prix">Prix:</label>
                    <input id="prix" type="text" />
                </div>
                </div>
              <div className="flex flex-row justify-center items-center space-x-4" >
              <button
                className="bg-orange text-white rounded-md px-2.5 py-1  "
                type="submit"
              >
                Ajouter
              </button>
              <button
                className="bg-orange text-white rounded-md px-2.5 py-1 "
                type="submit"
              >
                Annuler
              </button>
              </div>
              </div>

            </div>
          )}

          
        </form>
      )}

      
    </div>
  );
};

export default TrajetCreate;

