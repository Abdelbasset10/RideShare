import React, { useContext, useEffect, useState } from "react";
import ResearchBarMap from "../ResearchBarMap";
import { AuthContext } from "../../contexts/AuthContext.tsx";

const MapInput = ({  coord, setCoord,displayDefaultLoc = false,label = "Départ",cancelBtn=false }) => {

  const [isOpen,setIsOpen] = useState(false);
  const context = useContext(AuthContext);
  const [DefaultLocation,setDefaultLocation] = useState({ lat: 36.75, lng: 3.05 })


    useEffect(() => {
      if (context.position) {
        setDefaultLocation({
          lat: context.position.latitude,
          lng: context.position.longitude,
        })
      }
    },[])
    
  

  return (
    <div className="research-input">
      <p className="cursor-pointer" onClick={() => setIsOpen(true)}>
        {coord ? `${coord.name}` : label}
      </p>
      {isOpen && (
        <ResearchBarMap
          defaultLoc={DefaultLocation}
          setCoord={setCoord}
          displayCancel={cancelBtn}
          displayDefaultLoc={displayDefaultLoc}
          coord={coord}
          setIsMapOpen={setIsOpen}
        />
      )}
    </div>
  );
};
 
export default MapInput;