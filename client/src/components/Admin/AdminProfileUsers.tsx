import React, { useContext, useEffect, useState } from "react";
import { fetchFnc } from "../../utils/fetch";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import { errorToast, successToast } from "../../utils/helpers.ts";

const AdminProfileUsers = () => {

    const [data,setData] = useState(null)
    const {user} = useContext(AuthContext)

    useEffect(() => {
          const fetchData = async () => {

            try {
                const response = await fetchFnc({
                    url: "user/all", 
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${user?.apiKey}`,
                    }
                });
                console.log("data", response);
                
                setData(response.data);

                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
         fetchData();   
    },[]);


    const deleteUser = async (id) => {
        try {

            const response = await fetchFnc({
                url: `user/delete/${id}`, 
                method: "DELETE",   
                headers: {
                    Authorization: `Bearer ${user?.apiKey}`,
                }
            });
            
            successToast("Utilisateur supprimé avec succès");
        } catch (error) {
            errorToast(error);
        
        }
    }
    

   

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y bg-bg-clair">
                            <thead className="bg-bg-green-dark">
                                <tr>
                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-white uppercase">
                                        nom
                                    </th>
                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-white uppercase">
                                        Prenom
                                    </th>
                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-white uppercase">
                                        Email
                                    </th>
                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-white uppercase">
                                        Matricule
                                    </th>
                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-white uppercase">
                                        Tel
                                    </th>
                                    <th scope="col" className="px-20 py-3 text-left text-xs font-bold text-white uppercase">
                                        <span>Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-bg-clair divide-gray-200">
                                {data !== null && data.map((user, index)=> (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.first_name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{user.last_name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{user.matricule}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{user.n_tlph}</div>
                                        </td>
                                        <td className="px-20 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => {deleteUser(user.id)}} className="text-red-600 mr-2">Supprimer</button>
                                                <button onClick={() => {}} className="text-custom-green ">Modifier</button>
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

export default AdminProfileUsers;
