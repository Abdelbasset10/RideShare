import React from 'react';
import Person from '../assets/img/icons/Person.png';
import Temps from '../assets/img/icons/temps.png';
import car from '../assets/img/icons/car.png';
import Vecteur from '../assets/img/icons/vecteur.png';


const Box = () => {
  return (
    <div className="bg-white drop-shadow-lg rounded-lg p-4 w-2/6">
         <div className="trajet-upper ">
         <img className='h-3/4 w-6 ml-px' src={Vecteur} alt="vecteur" />
        <div className="trajet-upper-left  ">
          <div className="text-base font-bold text-gray-800  "> Alger Centre</div>
                
          <div className="text-base font-bold text-gray-800 ">Ben Akknoun</div>
        </div>

                <div className="trajet-upper-right"> 
                    <p className="trajet-prix text-base font-bold text-gray-800">300,00DA</p>
                </div>
            </div>
     
      <div className="mb-2">
        <div className="text-gray-700 mb-1 flex items-center">
          <img className='h-5 w-6' src={Person} alt="Person" />
           <p className='text-base font-medium'>Places disponibles : </p> <p>02</p>
        </div>
        <div className="text-gray-700 mb-1 flex items-center">
          <img className='h-5 w-5' src={Temps} alt="temps" />
           <p className='text-base font-medium'>Temps : </p> <p>09:00</p>
        </div>
        <div className="text-gray-700 mb-1 flex items-center">
          <img className='h-5 w-5' src={car} alt="car" />
           <p className='text-base font-medium'>Modèle :</p> <p> Stepway </p>
        </div>

      </div>
    </div>
  );
};

export default Box;