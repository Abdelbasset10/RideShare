import React from "react";
import ResearchBarMap from "../ResearchBarMap";

const MapInput = ({ isMapOpen,setIsMapOpen, coord, setCoord,DefaultLocation }) => {

  return (
    <div className="research-input">
      <p className="cursor-pointer" onClick={() => setIsMapOpen(true)}>
        {coord ? `${coord.name}` : "Depart"}
      </p>
      {isMapOpen && (
        <ResearchBarMap
          defaultLoc={DefaultLocation}
          setCoord={setCoord}
          coord={coord}
          setIsMapOpen={setIsMapOpen}
        />
      )}
    </div>
  );
};
 
export default MapInput;