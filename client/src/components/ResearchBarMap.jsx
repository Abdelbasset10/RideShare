import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { GEOCOD_API_KEY } from "../utils/globals";

function LocationMarker({ coord, setCoord }) {
  const map = useMapEvents({
    click(e) {
     let coord = e.latlng; 
     fetch(
        `https://geocode.maps.co/reverse?lat=${coord.lat}&lon=${coord.lng}&api_key=${GEOCOD_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) =>
          setCoord({
            ...e.latlng,
            name: `${data.address.road} , ${data.address.town}`,
          })
        ).finally(()=>console.log(coord));
    
   
    
    },
  });

  return coord === null ? null : (
    <Marker position={coord}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const ResearchBarMap = ({ defaultLoc, coord, setCoord, setIsMapOpen }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  });

  const approved = () => {
    document.body.style.overflow = "scroll";
    setIsMapOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-60 z-10">
      <div className="research-map-container ">
        <button className="done-btn" onClick={approved}>
          Confirmer
        </button>
        <MapContainer
          className="map-container"
          center={defaultLoc}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker setCoord={setCoord} coord={coord} />
        </MapContainer>
      </div>
    </div>
  );
};

export default ResearchBarMap;
