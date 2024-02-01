import React, { useState } from "react";
import { Trajet } from "../../utils/type-interfaces";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div>Trajet id: {trajet.id} </div>
      <form className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Lieu de Départ :</span>
          <input type="text" name="lieuDepart" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <label className="block">
          <span className="text-gray-700">Lieu d’Arrivée :</span>
          <input type="text" name="lieuArrivee" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <label className="block">
          <span className="text-gray-700">Date de Départ :</span>
          <input type="date" name="dateDepart" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <label className="block">
          <span className="text-gray-700">l’Heure de Départ :</span>
          <input type="time" name="heureDepart" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <label className="block">
          <span className="text-gray-700">Places Disponibles :</span>
          <input type="number" name="placesDisponibles" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <label className="block">
          <span className="text-gray-700">Prix :</span>
          <input type="number" name="prix" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <div className="flex items-center justify-between">
          <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Modifier
          </button>
          <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Annuler
          </button>
        </div>
      </form> 
   </div> 
);
};

export default TrajetEdit;
