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
          Lieu d’Arrivée :
          <input type="text" name="lieuArrivee" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        ...
      </form> 
   </div> 
);
};

export default TrajetEdit;
