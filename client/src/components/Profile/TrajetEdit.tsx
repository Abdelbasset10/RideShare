import React, { useState } from "react";
import { Trajet } from "../../utils/type-interfaces";
import Box from "../Box.tsx";

interface TrajetEditProps {
  trajet: Trajet;
}

const TrajetEdit = ({ trajet }: TrajetEditProps) => {
  const [formData, setFormData] = useState({
    lieuDepart: "",
    lieuArrivee: "",
    dateDepart: "",
    heureDepart: "",
    placesDisponibles: "",
    prix: ""
  });

  return (
    <div className="flex">
      <div className="w-1/2">
        <Box/>
      </div>
      <div className="w-1/2">
        <form className="space-y-4">
          <label className="block">
            <span className="text-custom-green">Lieu de Départ :</span>
            <input type="text" name="lieuDepart" className="mt-1 block w-full rounded-md   focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
          <label className="block">
            <span className=" text-custom-green">Lieu d’Arrivée :</span>
            <input type="text" name="lieuArrivee" className="mt-1 block w-full rounded-md   focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
          <div className="flex space-x-4">
            <label className="block w-1/2">
              <span className=" text-custom-green">Date de Départ :</span>
              <input type="date" name="dateDepart" className="mt-1 block w-full rounded-md   focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </label>
            <label className="block w-1/2">
              <span className=" text-custom-green">l’Heure de Départ :</span>
              <input type="time" name="heureDepart" className="mt-1 block w-full rounded-md   focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </label>
          </div>
          <div className="flex space-x-4">
            <label className="block w-1/2">
              <span className=" text-custom-green">Places Disponibles :</span>
              <input type="number" name="placesDisponibles" min="0"className="mt-1 block w-full rounded-md   focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </label>
            <label className="block w-1/2">
              <span className=" text-custom-green">Prix :</span>
              <input type="number" min="0" name="prix" className="mt-1 block w-full rounded-md   focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button type="button" className="bg-orange-500 text-white rounded-full px-2.5 py-1 ">
              Modifier
            </button>
            <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrajetEdit;
