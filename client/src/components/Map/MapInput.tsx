import React, { useContext, useEffect, useState } from "react";
import ResearchBarMap from "../ResearchBarMap";
import { AuthContext } from "../../contexts/AuthContext.tsx";

const MapInput = ({ name = null, coord, setCoord,displayDefaultLoc = false,label = "Départ",cancelBtn=false }) => {

  const [isOpen,setIsOpen] = useState(false);
  const [nameCoord,setNameCoord] = useState(name);
  const context = useContext(AuthContext);
  const def = coord ? { lat: coord.lat, name:coord.name, lng: coord.lng } :  { lat: 48.8566,  lng: 2.3522 };
  const [DefaultLocation,setDefaultLocation] = useState(def)


    useEffect(() => {
      if (context.position) {
        setDefaultLocation({
          lat: context.position.latitude,
          lng: context.position.longitude,
          name: context.position.name
        })
      }

    },[])
    
    const displayName = () => {
      if (coord && coord.name !== undefined && coord.name !== null) {
        return coord.name;
      }
      
      if (nameCoord !== null) {
        return nameCoord;
      }
  
      return label;
    }

  return (
    <div className="research-input">
      <p className="cursor-pointer" onClick={() => setIsOpen(true)}>
        {displayName()}
      </p>
      {isOpen && (
        <ResearchBarMap
          defaultLoc={DefaultLocation}
          setCoord={setCoord}
          displayCancel={cancelBtn}
          displayDefaultLoc={displayDefaultLoc}
          coord={coord}
          setIsMapOpen={setIsOpen}
          setNameCoord={setNameCoord}
        />
      )}
    </div>
  );
};
 
export default MapInput;