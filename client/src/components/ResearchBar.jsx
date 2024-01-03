import { useEffect, useState } from "react";
import { useForm, useController } from "react-hook-form";

import destionationIcon from "../assets/img/icons/icon_destination.png";
import timeIcon from "../assets/img/icons/icon_clock.png";
import dateIcon from "../assets/img/icons/icon_calendar.png";
import researchIcon from "../assets/img/icons/icon_research.png";

import { useRef } from "react";
import ResearchBarMap from "./ResearchBarMap";

const ResearchBar = ({ onSearch }) => {
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});

  const { register, control, handleSubmit } = useForm();

  const { departureField } = useController({ name: "departure", control });
  const { destinationField } = useController({ name: "destination", control });
  const { dateField } = useController({ name: "date", control });
  const { timeField } = useController({ name: "time", control });

  const { departure, destination, date, time } = userData;
  const formRef = useRef(null);
  /////////////////////////////////////////////////////////
  const DefaultLocation = { lat: 36.75, long: 3.05 };
  const DefaultZoom = 10;

  const geoLocDest = useRef(null);

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [isDepartMapOpen, setIsDepartMapOpen] = useState(false);
  const [isDestMapOpen, setIsDestMapOpen] = useState(false);

  const [departCoord, setDepartCoord] = useState(DefaultLocation);
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
    //const errors = validateData();
    //
    //if (Object.keys(errors).length) {
    //    setErrors(errors);
    //    return ;
    //}

    setErrors({});
    onSearch(formValues);
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

          <div className="research-input">
            <p
              className="cursor-pointer"
              onClick={() => setIsDepartMapOpen(true)}
            >
              Départ
            </p>
            {isDepartMapOpen && (
              <div className="departure-map">
                <ResearchBarMap
                  setCoord={setDepartCoord}
                  coord={departCoord}
                  setIsMapOpen={setIsDepartMapOpen}
                />
              </div>
            )}
          </div>
          <hr className="separator" />
        </div>

        <div className="category !text-bg-green-dark research-destination col-span-3">
          <img src={destionationIcon} alt="Destination" />
          <hr className="separator" />
        </div>

        <div className="category research-date col-span-2">
          <img src={dateIcon} alt="Date Depart" />
          <input className="research-input" type="text" placeholder="Date" />
          <hr className="separator" />
        </div>

        <div className="category research-time  col-span-2">
          <img
            className="!text-bg-green-dark "
            src={timeIcon}
            alt="Heure Depart"
          />
          <input placeholder="Heure" className="research-input" type="text" />
        </div>

        <div
          onClick={() => {
            formRef.current.submit();
          }}
          className="cursor-pointer category research-submit col-span-2"
        >
          <img src={researchIcon} alt="Submit button" />
          <button type="submit">Rechercher</button>
        </div>
      </form>
    </>
  );
};

export default ResearchBar;
