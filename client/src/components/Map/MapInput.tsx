import React from "react";
import ResearchBarMap from "../ResearchBarMap";

const MapInput = ({ isMapOpen,setIsMapOpen, coord, setCoord,DefaultLocation,displayDefaultLoc,label = "Départ" }) => {

  return (
    <div className="research-input">
      <p className="cursor-pointer" onClick={() => setIsMapOpen(true)}>
        {coord ? `${coord.name}` : label}
      </p>
      {isMapOpen && (
        <ResearchBarMap
          defaultLoc={DefaultLocation}
          setCoord={setCoord}
          displayDefaultLoc={displayDefaultLoc}
          coord={coord}
          setIsMapOpen={setIsMapOpen}
        />
      )}
    </div>
  );
};
 
export default MapInput;