import React, { useState } from 'react';
import Person from '../assets/img/icons/Person.png';
import Temps from '../assets/img/icons/temps.png';
import car from '../assets/img/icons/car.png';
import Vecteur from '../assets/img/icons/vecteur.png';
import { Trajet } from '../utils/type-interfaces';
import ReservationPopup from './ReservationPopup.tsx';


const Box = ({trajet, reserverAction = false}: {trajet: Trajet,reserverAction: any}) => {

  const [isOpenPop,setIsOpenPop] = useState(false);

  return (
    <>
    <div className="bg-white drop-shadow-lg rounded-xl  p-4 w-full flex flex-col items-start justify-center">
         <div className="trajet-upper ">
              <img className='h-full w-4 ' src={Vecteur} alt="vecteur" />
              <div className="trajet-upper-left text-sm my-4  ">
                <div className=" font-bold text-gray-800  "> {trajet.position_start.name}</div>
                      
                <div className=" self-end font-bold text-gray-800 ">{trajet.position_end.name}</div>
              </div>

                      <div className="trajet-upper-right my-4"> 
                          <p className="trajet-prix text-xl font-bold text-gray-800">{trajet.price} DA</p>
                      </div>
          </div>
     
      <div className="mb-2 w-full flex justify-between px-2 items-center">
        <div>
        <div className="text-gray-700 mb-2 flex items-center">
          <img className='mr-2  h-5 w-6' src={Person} alt="Person" />
           <p className='text-base font-medium'>Places disponibles : </p> <p>{` ${trajet.nb_place}`}</p>
        </div>
        
        <div className="text-gray-700 mb-2 flex items-center">
          <img className='mr-2  h-5 w-5' src={Temps} alt="temps" />
           <p className='text-base font-medium'>Temps : </p> <p>{` ${trajet.hour_start}`}</p>
        </div>
        
        <div className="text-gray-700 mb-2 flex items-center">
          <img className='mr-2  h-5 w-5' src={car} alt="car" />
           <p className='text-base font-medium'>Modèle : </p> <p>{` ${trajet.car.marque} ${trajet.car.model}`}   </p>
        </div>
        </div>
      
        {reserverAction  && (
         <button onClick={() => setIsOpenPop(true)} className='bg-orange text-white h-fit text-xl rounded-lg py-2  px-4'>
          Reserver
        </button>
        )}
        
      
      </div>
    </div>
      {isOpenPop && <ReservationPopup setIsOpenPop={setIsOpenPop} isOpen={isOpenPop} trajet={trajet} /> }

    </>
  );
};

export default Box;