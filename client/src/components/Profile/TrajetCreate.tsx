
import React, { useContext, useEffect, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useController,
  useForm,
} from "react-hook-form";
import { z, string, optional, number } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/auth/useAuth";
import Remplir from '../../assets/img/icons/Remplir.png';
import destionationIcon from "../../assets/img/icons/icon_destination.png";
import ResearchBarMap from "../ResearchBarMap";
import MapInput from "../Map/MapInput.tsx";
import { fetchFnc } from "../../utils/fetch.js";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../utils/helpers.ts";
import { GEOCOD_API_KEY } from "../../utils/globals.js";
import { AuthContext } from "../../contexts/AuthContext.tsx";


const TrajetCreate = ({ setUpdate, update }) => {
  const { user } = useAuth();

  const schema = z.object({
    start_date: string().min(2),
    hour_start: string().min(2),
    nb_place: number().positive(),
    price: number().positive(),
  });

  const { register, handleSubmit, control, formState } = useForm({
    resolver: zodResolver(schema),
  });

  const { field: maxPlaceField } = useController({
    name: "nb_place",
    control,
  });

  const { field: priceField } = useController({
    name: "price",
    control,
  });

  const { errors } = formState;

  const navigate = useNavigate();

  const context = useContext(AuthContext);

  const [departCoord, setDepartCoord] = useState(null);
  const [isDepartMapOpen, setIsDepartMapOpen] = useState(false);
  const [destCoord, setDestCoord] = useState(null);
  const [isDestMapOpen, setIsDestMapOpen] = useState(false);

  const DefaultLocation = { lat: 36.75, lng: 3.05 };

  const onCreateTrajet = async (data) => {
    const trajet = {
      ...data,
      start_lat: Number(departCoord?.lat),
      start_long: Number(departCoord?.lng),
      start_name: departCoord?.name,
      end_lat: Number(destCoord?.lat),
      end_long: Number(destCoord?.lng),
      end_name: destCoord?.name,
      chauffeur_id: user?.id,
    };

    const formData = new FormData();
    formData.append("start_date", trajet.start_date);
    formData.append("hour_start", trajet.hour_start);
    formData.append("nb_place", trajet.nb_place);
    formData.append("price", trajet.price);
    formData.append("start_lat", trajet.start_lat);
    formData.append("start_long", trajet.start_long);
    formData.append("start_name", trajet.start_name);
    formData.append("end_lat", trajet.end_lat);
    formData.append("end_long", trajet.end_long);
    formData.append("end_name", trajet.end_name);
    formData.append("chauffeur_id", trajet.chauffeur_id);

    try {
      const successMsg = await fetchFnc({
        url: "trajet/create",
        method: "post",
        data: formData,
        headers: {
          Authorization: `Bearer ${user?.apiKey}`,
        },
      });
      successToast("Trajet crée avec succes");
      setUpdate(!update);
    } catch (errMsg) {
      errorToast(errMsg);
    }
  };

  return (
    <div className="profile-account-wrapper">
      <div className="font-bold text-2xl w-17 h-10 flex justify-center items-center">
        <img className="w-12" src={Remplir} alt="Remplir icon" />
        <p>Veuiller Remplir les Champs Suivants</p>
      </div>
      <form
        className="profile-create-trajet-form"
        onSubmit={handleSubmit(onCreateTrajet)}
      >
        <div className="profile-create-trajet-wrapper ">
          <div className="w-full">
            <hr className="w-full border my-4" />

            <div className="form-row grid-cols-2">
              <div className="form-group">
                <label htmlFor="Lieu_depart">Lieu de Départ:</label>
                <div className="error-msg">
                  {errors?.departCoord?.message?.toString() ?? ""}
                </div>
                <MapInput
                  isMapOpen={isDepartMapOpen}
                  setIsMapOpen={setIsDepartMapOpen}
                  coord={departCoord}
                  setCoord={setDepartCoord}
                  displayDefaultLoc={true}
                  DefaultLocation={
                    context.position
                      ? {
                          lat: context.position.latitude,
                          lng: context.position.longitude,
                        }
                      : DefaultLocation
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="Lieu_arrivee">Lieu d'Arrivé:</label>
                <MapInput
                  isMapOpen={isDestMapOpen}
                  setIsMapOpen={setIsDestMapOpen}
                  coord={destCoord}
                  setCoord={setDestCoord}
                  displayDefaultLoc={true}
                  label="Destination"
                  DefaultLocation={
                    context.position
                      ? {
                          lat: context.position.latitude,
                          lng: context.position.longitude,
                        }
                      : DefaultLocation
                  }
                />
              </div>
            </div>

            <div className="form-row grid-cols-2">
              <div className="form-group">
                <label htmlFor="Date_depart">Date de Départ:</label>
                <input
                  id="Date_depart"
                  type="date"
                  {...register("start_date")}
                />
              </div>

              <div className="form-group">
                <label htmlFor="heure_depart">l'Heure de Départ:</label>
                <div className="error-msg">
                  {errors?.start_date?.message?.toString() ?? ""}
                </div>

                <input
                  type="time"
                  id="heure_depart"
                  {...register("hour_start")}
                />
              </div>
            </div>

            <div className="form-row grid-cols-2">
              <div className="form-group">
                <label htmlFor="place_dispo">Places Disponibles:</label>
                <div className="error-msg">
                  {errors?.nb_place?.message?.toString() ?? ""}
                </div>

                <input
                  id="place_dispo"
                  type="number"
                  value={maxPlaceField.value}
                  onChange={(data) => {
                    const maxPlace = Number(data.target.value);
                    maxPlaceField.onChange(maxPlace);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="prix">Prix:</label>
                <div className="error-msg">
                  {errors?.price?.message?.toString() ?? ""}
                </div>
                <input
                  id="prix"
                  type="number"
                  value={priceField.value}
                  onChange={(data) => {
                    const price = Number(data.target.value);
                    priceField.onChange(price);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-row justify-center items-center space-x-4">
              <button
                className="bg-orange text-white rounded-md px-2.5 py-1  "
                type="submit"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TrajetCreate;

