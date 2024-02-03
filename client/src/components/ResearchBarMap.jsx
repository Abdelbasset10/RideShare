import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { GEOCOD_API_KEY } from "../utils/globals";
import useGeolocation from "../hooks/localization/useGeolocation";

function LocationMarker({ coord, setCoord,defaultLoc,displayDefaultLoc,refreshed}) {
  
  
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

  if (coord === null) {
    if (displayDefaultLoc && !refreshed) {
      return  <Marker position={defaultLoc}>
                <Popup>You are here</Popup>
              </Marker>
    } else {
      return null
    }
  } else {
    return (<Marker position={coord}>
      <Popup>You are here</Popup>
    </Marker>)

  }
}

const ResearchBarMap = ({ displayCancel,defaultLoc, coord, setCoord, setIsMapOpen, displayDefaultLoc = false }) => {

  const refreshed = useRef(false);

  useEffect(() => {
    if (displayDefaultLoc) {
      setCoord(defaultLoc)
    }
    document.body.style.overflow = "hidden";
  },[]);


  const approved = () => {
    document.body.style.overflow = "scroll";
    setIsMapOpen(false);
  };

  const refresh = () => {
    refreshed.current = true;
    setCoord(null);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-60 z-10">
      <div className="research-map-container ">

        <div className="cursor-pointer done-btn text-center bg-white ring-4 ring-bg-green-dark rounded-2xl animate-bounce z-20 text-bg-green-dark px-5 py-1.5 text-xl absolute left-[35%] right-[50%] top-5" onClick={approved}>
          Confirmer
        </div>
        {!displayCancel &&
            <div className="  text-center cursor-pointer done-btn bg-red-600 ring-4 ring-red-500 rounded-2xl animate-bounce z-20 text-white px-5 py-1.5 text-xl absolute left-[51%] right-[34%] top-5" onClick={refresh}>
            Refresh
          </div>
        }
        <MapContainer
          className="map-container"
          center={coord ? {lat: coord.lat,lng: coord.lng} :  defaultLoc}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker setCoord={setCoord} coord={coord} refreshed={refreshed.current} displayDefaultLoc={displayDefaultLoc} defaultLoc={defaultLoc} />
        </MapContainer>
      </div>
    </div>
  );
};

export default ResearchBarMap;
