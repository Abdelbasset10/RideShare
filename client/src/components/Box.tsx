import React from 'react';
import Person from '../assets/img/icons/Person.png';

const Box = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64">
         <div className="trajet-upper">
                <div className="trajet-upper-left">
                    <p className="trajet-date">23/12/2023</p>
                    <p className="trajet-prix">250,00 DA</p>
                </div>

                <div className="trajet-upper-right">
                    
                    <p className="trajet-prix">250,00 DA</p>
                </div>
            </div>
      <div className="text-lg font-bold text-gray-800 mb-2">
     Alger Centre
      </div>

      <div className="text-lg font-bold text-gray-800 mb-2">Ben Akknoun</div>
      <div className="mb-2">
        <div className="text-gray-700 mb-1"><img src={Person} alt="Person" /> Places disponibles: 02</div>
        <div className="text-gray-700 mb-1">Temps: 09:00</div>
        <div className="text-gray-700">Modèle: Stepway</div>
      </div>
      <div className="text-lg font-bold text-gray-800">300,00 DA</div>
    </div>
  );
};

export default Box;