import React, { useContext, useState } from "react";
import { Trajet } from "../../utils/type-interfaces";
import Box from "../Box.tsx";
import { useForm } from "react-hook-form";
import MapInput from "../Map/MapInput.tsx";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import { fetchFnc } from "../../utils/fetch";
import { errorToast, successToast } from "../../utils/helpers.ts";

interface TrajetEditProps {
  trajet: Trajet;
}

const TrajetEdit = ({ trajet }: TrajetEditProps) => {

  const {register, handleSubmit,control,formState} = useForm({
    defaultValues: {
      start_date: trajet.start_date,
      price: trajet.price,
      nb_place: trajet.nb_place,
      hour_start: trajet.hour_start,

    }
  });
  const {user} = useContext(AuthContext);

  const [departCoord,setDepartCoord] = useState({
    lat: trajet.position_start.latitude,
    lng: trajet.position_start.longitude
  });
  const [destCoord,setDestCoord] = useState({
    lat: trajet.position_end.latitude,
    lng: trajet.position_end.longitude
  });

  const modifyTrajet = async (e) => {
     e.userId = user.id;
     e.start_lat = departCoord.lat;
     e.end_lat = destCoord.lat;

     e.start_long = departCoord.lng;
     e.end_long = destCoord.lng;
     
     const formData = new FormData();
     for (let [key,value] of Object.entries(e)) {
          formData.append(key,value);
     }

     try {
     await fetchFnc({
      url: `trajet/update/${trajet.id}`,
      method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.apiKey}`,
        },
      data: formData
     })
     successToast("Trajet edité avec succès");
    } catch(e) {
      errorToast(e)
    }
     
  }



  return (
    <div className="grid grid-cols-12 mx-10 gap-8">
      <div className="col-span-5">
        <Box reserverAction={false} trajet={trajet}/>
      </div>

      <div className="col-span-7">
        <form className="space-y-4" onSubmit={handleSubmit(modifyTrajet)}>
            <span className="text-custom-green">Lieu de Départ :</span>
            <MapInput
            coord={departCoord}
            setCoord={setDepartCoord}
            displayDefaultLoc={true}
            cancelBtn={true}
          />
            <span className=" text-custom-green">Lieu d’Arrivée :</span>
            <MapInput
            coord={destCoord}
            setCoord={setDestCoord}
            displayDefaultLoc={true}
            cancelBtn={true}
          />

          <div className="flex space-x-4">
            <label className="block w-1/2">
              <span className=" text-custom-green">Date de Départ :</span>
              <input type="date" {...register("start_date")} className="mt-1 block w-full rounded-md   focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </label>
            <label className="block w-1/2">
              <span className=" text-custom-green">l’Heure de Départ :</span>
              <input type="time"   {...register("hour_start")} className="mt-1 block w-full rounded-md   focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </label>
          </div>
          <div className="flex space-x-4">
            <label className="block w-1/2">
              <span className=" text-custom-green">Places Disponibles :</span>
              <input type="number"  {...register("nb_place")} min="0" className="mt-1 block w-full rounded-md   focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </label>
            <label className="block w-1/2">
              <span className=" text-custom-green">Prix :</span>
              <input type="number" min="0" {...register("price")}  className="mt-1 block w-full rounded-md   focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button  type="submit" className="bg-orange-500 text-white bg-bg-green-dark rounded-full px-2.5 py-1 ">
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrajetEdit;
