import React from 'react';
import AdminPhoto from '../../assets/img/icons/AdminPhoto.png';
import Calender from '../../assets/img/icons/calender.png';
import Route from '../../assets/img/icons/route.png';



const ProfileChauffeurBox = () => {
  return (
    <div className=" bg-white drop-shadow-lg rounded-lg p-4 w-3/12 ">
         <div className="trajet-upper flex flex-col  items-center justify-center">
         <img className='h-20 w-20 ml-px' src={AdminPhoto} alt="Admin Photo" />
      
          <div className="text-base font-bold text-gray-800   "> Nom,Prénom</div>
 
            </div>
     
      <div className="mb-2 ">
        <div className="text-gray-700 mb-1 flex items-center justify-center">
          <img className='h-5 w-6' src={Calender} alt="Person" />
           <p className='text-base font-medium'>Date d’inscription : </p> <p>14/08/2023</p>
        </div>
        <div className="text-gray-700 mb-1 flex items-center justify-center">
          <img className='h-5 w-5' src={Route} alt="Route" />
           <p className='text-base font-medium'>Trajets effectués : </p> <p>08</p>
        </div>

      </div>
    </div>
  );
};

export default ProfileChauffeurBox;