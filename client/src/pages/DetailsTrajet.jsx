import React from 'react'
import Box from "../components/Box.tsx";
import ProfileChauffeurBox from "../components/Profile/ProfileChauffeurBox.tsx";
import destionationIcon from "../assets/img/icons/icon_destination.png";
import Map from "../assets/img/icons/map.png";
import { useLocation } from 'react-router-dom';


const DetailsTrajet = () => {

  const location = useLocation();
  const { trajet } = location.state || {}; // Accessing state with destructuring


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
      <Box  trajet={trajet}/>
      <div className="mr-60"></div>
      <ProfileChauffeurBox />
    </div>
    <div className="mb-20"></div>
    <div className='flex justify-center'>
          <img className='w-[1211px] h-[798px] 'src={Map} alt="Destination" />

     </div>


  </div> 
   )
}
export default DetailsTrajet;
