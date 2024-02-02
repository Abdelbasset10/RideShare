import React from 'react';
import AdminPhoto from '../../assets/img/icons/AdminPhoto.png';
import Calender from '../../assets/img/icons/calender.png';
import Route from '../../assets/img/icons/route.png';



const ProfilUserBox = () => {
  return (
    <div className=" bg-white drop-shadow-lg rounded-lg p-4 w-3/6 h-2/5 ">
      <div className="absolute top-0 right-4">
    <div className=" relative col-end-11 ">
    <img className='h-20 w-20 ' src={AdminPhoto} alt="Admin Photo" />
 
     <div className="text-base text-gray-800 align-bottom"> 
     <p className='font-bold'>Nom,Prénom</p>
     <p className='font-base'>Conducteur</p>

     </div>
     

       </div>
       </div>

 <div className="ml-4 ">
   <div className="text-gray-700 mb-1 flex items-center ">
      <p className='text-base font-medium'>Email :</p> <p>exemple@gmail.com</p>
   </div>
   <div className="text-gray-700 mb-1 flex items-center ">
      <p className='text-base font-medium'>Mot de passe : </p> <p>*********</p>
   </div>
   <div className="text-gray-700 mb-1 flex items-center  ">
      <p className='text-base font-medium'>Matricule :</p> <p>0000000000000</p>
   </div>
   <div className="text-gray-700 mb-1 flex items-center  ">
      <p className='text-base font-medium'>N° Téléphone : </p> <p>00000000000000</p>
   </div>
   <div className="text-gray-700 mb-1 flex items-center  ">
      <p className='text-base font-medium'>Matricule de Vehicule : </p> <p>0000000000000</p>
   </div>
   <div className="text-gray-700 mb-1 flex items-center  ">
      <p className='text-base font-medium'>Nombre max de Places :</p> <p>0</p>
   </div>
   <div className="text-gray-700 mb-1 flex items-center  ">
      <p className='text-base font-medium'>Modéle de Vehicule : </p> <p>Renault</p>
   </div>
   <div className="text-gray-700 mb-1 flex items-center  ">
      <p className='text-base font-medium'>Année de Vehicule : </p> <p>2019</p>
   </div>
   <div className="text-gray-700 mb-1 flex items-center  ">
      <p className='text-base font-medium'>Couleur de Vehicule : </p> <p>Noir</p>
   </div>

 </div>
</div>
  );
};

export default ProfilUserBox;