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

const ResearchBar = ({ defaultValues = {}, onSearch }) => {
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      date: defaultValues.date,
      start_hour: defaultValues.start_hour
    }
  });
  const context = useContext(AuthContext);

  
  const formRef = useRef(null);
  let defaultDepart = null
  let defaultDest = null
  
  if (defaultValues.dest_long && defaultValues.dest_lat) {
     defaultDest = {lat: defaultValues.dest_lat,lng: defaultValues.dest_long}
  }

  if (defaultValues.depart_long && defaultValues.depart_lat) {
    defaultDepart = {lat: defaultValues.depart_lat,lng: defaultValues.depart_long}
 }

  const [departCoord, setDepartCoord] = useState(defaultDepart);
  const [destCoord, setDestCoord] = useState(defaultDest);

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

  const handleSearch = (formValues) => {
    let val = {...formValues}
    val.depart_long = departCoord?.lng;
    val.depart_lat = departCoord?.lat;
    val.dest_long = destCoord?.lng;
    val.dest_lat = destCoord?.lat;
    val.dest_name = destCoord?.name;
    val.depart_name = departCoord?.name;
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
            coord={departCoord}
            name={defaultValues.depart_name || null} 
            setCoord={setDepartCoord}
            displayDefaultLoc={true}
          />
          <hr className="separator" />
        </div>

        <div className="category research-departure col-span-3">
          <img src={destionationIcon} alt="Destination" />
          <MapInput
            coord={destCoord}
            setCoord={setDestCoord}
            name={defaultValues.dest_name || null} 
            displayDefaultLoc={true}
            label="Destination"
            
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

        <button className="cursor-pointer category research-submit col-span-2">
          <img src={researchIcon} alt="Submit button" />
          <div type="submit">Rechercher</div>
        </button>
      </form>
    </>
  );
};

export default ResearchBar;
