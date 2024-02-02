import { useContext, useEffect, useState } from "react";
import { useForm, useController } from "react-hook-form";

import destionationIcon from "../assets/img/icons/icon_destination.png";
import timeIcon from "../assets/img/icons/icon_clock.png";
import dateIcon from "../assets/img/icons/icon_calendar.png";
import researchIcon from "../assets/img/icons/icon_research.png";

import { useRef } from "react";
import ResearchBarMap from "./ResearchBarMap";
import MapInput from "./Map/MapInput.tsx";
import useGeolocation from "../hooks/localization/useGeolocation";
import { AuthContext } from "../contexts/AuthContext.tsx";

const ResearchBar = ({ onSearch }) => {
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});

  const { register, control, handleSubmit } = useForm();
  const context = useContext(AuthContext);

  
  const formRef = useRef(null);
  /////////////////////////////////////////////////////////
  


  const DefaultLocation = { lat: 36.75, lng: 3.05 };
  const DefaultZoom = 10;

  const geoLocDest = useRef(null);

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [isDepartMapOpen, setIsDepartMapOpen] = useState(false);
  const [isDestMapOpen, setIsDestMapOpen] = useState(false);

  const [departCoord, setDepartCoord] = useState(null);
  const [destCoord, setDestCoord] = useState(null);
  const [location, setLocation] = useState(defaultLocation);

  /////////////////////////////////////////////////
  //              onChange Functions
  /////////////////////////////////////////////////
  const onTimeChange = (options) => {
    userData.time = {
      hour: options["$H"],
      minutes: options["$m"],
    };
    setUserData(userData);
  };

  const onDateChange = (options) => {
    userData.date = {
      day: options["$D"],
      month: options["$M"],
      year: options["$Y"],
    };
    setUserData(userData);
  };

  const validateData = () => {
    return {};
  };

  const handleSearch = (formValues) => {
    let val = {...formValues}
    val.depart_long = departCoord?.lng;
    val.depart_lat = departCoord?.lat;
    val.dest_long = destCoord?.lng;
    val.dest_lat = destCoord?.lat;
    console.log("formVal", val);
    onSearch(val);
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit(handleSearch)}
        className="home-research-bar"
      >
        <div className="category research-departure col-span-3">
          <img src={destionationIcon} alt="Destination" />

          <MapInput
            isMapOpen={isDepartMapOpen}
            setIsMapOpen={setIsDepartMapOpen}
            coord={departCoord}
            setCoord={setDepartCoord}
            displayDefaultLoc={true}
            DefaultLocation={
              context.position
                ? {
                    lat: context.position.latitude,
                    lng: context.position.longitude,
                  }
                : DefaultLocation
            }
          />
          <hr className="separator" />
        </div>

        <div className="category research-departure col-span-3">
          <img src={destionationIcon} alt="Destination" />
          <MapInput
            isMapOpen={isDestMapOpen}
            setIsMapOpen={setIsDestMapOpen}
            coord={destCoord}
            setCoord={setDestCoord}
            displayDefaultLoc={true}
            label="Destination"
            DefaultLocation={
              context.position
                ? {
                    lat: context.position.latitude,
                    lng: context.position.longitude,
                  }
                : DefaultLocation
            }
          />

          <hr className="separator" />
        </div>

        <div className="category research-date col-span-2">
          <input
            className="research-input"
            type="date"
            {...register("date")}
            placeholder="Date"
          />
          <hr className="separator" />
        </div>

        <div className="category research-time  col-span-2">
          <img
            className="!text-bg-green-dark "
            src={timeIcon}
            alt="Heure Depart"
          />
          <input
            placeholder="Heure"
            {...register("start_hour")}
            className="research-input"
            type="time"
          />
        </div>

        <div className="cursor-pointer category research-submit col-span-2">
          <img src={researchIcon} alt="Submit button" />
          <button type="submit">Rechercher</button>
        </div>
      </form>
    </>
  );
};

export default ResearchBar;
