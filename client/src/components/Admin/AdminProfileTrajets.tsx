import React from "react";

const AdminProfileTrajets = () => {
    // les donnes reels
    const trajets = [
        {
            trajet: "lieu1/lieu",
            lieuDepart: "lieu1",
            lieuArrivee: "lieu",
            dateHeure: "23/11/2023 06:00 AM",
            prix: "300.00 DA",
            placesDisponibles: 4,
        },
    ];

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y bg-bg-clair">
                            <thead className="bg-bg-green-dark">
                                <tr className="bg-bg-green-dark">
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase ">
                                        Trajet
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase  ">
                                        Lieu de Départ
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase  ">
                                        Lieu d'Arrivée
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase  ">
                                        Date et Heure
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase  ">
                                        Prix
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase  ">
                                        Nombre de places disponibles
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase  ">
                                        <span>Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-bg-clair divide-y divide-gray-200">
                                {trajets.map((trajet, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{trajet.trajet}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{trajet.lieuDepart}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{trajet.lieuArrivee}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{trajet.dateHeure}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{trajet.prix}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{trajet.placesDisponibles}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => {/* fonction supprission */}} className="text-red-600 mr-2">Supprimer</button>
                                                <button onClick={() => {/* fonction modification */}} className="text-custom-green ">Modifier</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfileTrajets;
