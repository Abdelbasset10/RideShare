import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { fetchFnc } from "../../utils/fetch";
import { AuthContext } from "../../contexts/AuthContext.tsx";

const AdminProfileTrajets = () => {

const {user} = useContext(AuthContext);
const [trajetData,setTrajetData] = useState([])

    

    useEffect(()=>{
        const fetchTrajets = async () => {
            const data = await fetchFnc({url:'trajet/',headers: {
                Authorization:`Bearer ${user?.apiKey}`
            }})
            setTrajetData(data.data)
            console.log(data)
        }
        fetchTrajets()
    },[])

    console.log(trajetData)

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y bg-bg-clair">
                            <thead className="bg-bg-green-dark">
                                <tr className="bg-bg-green-dark">
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
                                {trajetData.map((ok, index) => (
                                    
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{ok?.position_start?.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{ok?.position_end?.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{ok?.hour_start}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{ok?.price}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{ok?.nb_place}</div>
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
