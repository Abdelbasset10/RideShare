import React from 'react'
import TrajetBox from "../components/TrajetBox.tsx";
import ProfilBox from "../components/Profile/ProfilBox.tsx";
import destionationIcon from "../assets/img/icons/icon_destination.png";
import Map from "../assets/img/icons/map.png";

import MapInput from "../components/Map/MapInput.tsx"

const DetailsTrajet = () => {
  return (
    <div className="bg-beige pb-96 w-full h-full text-center "> 

    <div className="w-8/12 m-auto">
      <div className="header">
        <p className='text-orange text-base'>Pour voi plus de détails sur le trajet selectioné</p>
        <div className="flex justify-center items-start">
          <h1 className="mr-1 text-bg-green-dark font-bold text-4xl">Détail De Trajet</h1>
        </div>
      </div>
    </div>
    <div className="mb-20"></div>
    <div className='flex  justify-center'>
      <TrajetBox  />
      <div className="mr-80"></div>
      <ProfilBox />
    </div>
    <div className="mb-20"></div>
    <div className='flex justify-center'>
          <img className='w-[1211px] h-[798px] 'src={Map} alt="Destination" />

     </div>


  </div> 
   )
}
export default DetailsTrajet;
