import React from "react";

const AdminProfileUsers = () => {
    // les donnes reels
    const users = [
        { 
            nom: "abdoun",
            prenom: "dhouha",
            email: "nom.prenom@gmail.com",
            matricule: "wwwwwwwww",
            tel: "0799999999",
        },
    ];

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
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.nom}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{user.prenom}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{user.matricule}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{user.tel}</div>
                                        </td>
                                        <td className="px-20 py-4 whitespace-nowrap text-right text-sm font-medium">
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

export default AdminProfileUsers;
