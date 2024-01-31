import React from 'react';
import Person from '../assets/img/icons/Person.png';
import Temps from '../assets/img/icons/temps.png';
import car from '../assets/img/icons/car.png';


const Box = () => {
  return (
    <div className="bg-white drop-shadow-lg rounded-lg p-4 w-64">
         <div className="trajet-upper">
                <div className="trajet-upper-left">
                <div className="text-lg font-bold text-gray-800 mb-2"> Alger Centre</div>
               <div className="text-lg font-bold text-gray-800 mb-2">Ben Akknoun</div>
                </div>

                <div className="trajet-upper-right">
                    
                    <p className="trajet-prix text-lg font-bold text-gray-800">300,00 DA</p>
                </div>
            </div>
     
      <div className="mb-2">
        <div className="text-gray-700 mb-1 flex items-center">
          <img className='h-5 w-6' src={Person} alt="Person" />
           <p className='text-lg font-medium'>Places disponibles : </p> <p>02</p>
        </div>
        <div className="text-gray-700 mb-1 flex items-center">
          <img className='h-5 w-5' src={Temps} alt="temps" />
           <p className='text-lg font-medium'>Temps : </p> <p>09:00</p>
        </div>
        <div className="text-gray-700 mb-1 flex items-center">
          <img className='h-5 w-5' src={car} alt="car" />
           <p className='text-lg font-medium'>Modèle :</p> <p> Stepway </p>
        </div>

      </div>
    </div>
  );
};

export default Box;