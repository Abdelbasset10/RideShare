import { useContext, useEffect, useRef, useState } from "react";
import presentationIllustration from "../assets/img/illustrations/illustration_home_page_about.png";
import FirstIllustration from "../assets/img/illustrations/illustration_how_to_step_1.png";
import SecondIllustration from "../assets/img/illustrations/illustration_how_to_step_2.png";
import ThirdIllustration from "../assets/img/illustrations/illustration_how_to_step_3.png";

import ResearchBar from "../components/ResearchBar.jsx";
import NearestTrajetsList from "../components/NearestTrajetsList.jsx";

import { useGeolocated } from "react-geolocated";
import useGeolocation from "../hooks/localization/useGeolocation.jsx";
import { AuthContext } from "../contexts/AuthContext.tsx";
import {  useNavigate } from "react-router-dom";
import React from "react";
import {useFetch} from '../hooks/fetch/useFetch.tsx'
import ReservationPopup from "../components/ReservationPopup";

const Home = () => {
  const trajets = {
    trajets: [{}],
  };

  
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  let  url = "trajet";
  let formData = new FormData();


  if (context.position && context.position?.latitude !== undefined && context.position?.longitude !== undefined) {
    formData.append("lat",context.position.latitude);
    formData.append("long",context.position.longitude);
    url = "trajet";    
  } else {
    url = "trajet"
  }
    
    let { data, loading, error } = useFetch({
      url: url,
      axiosData: formData,
    });


  const tooltipText = context.errorPos
    ? `Trajets récuperes par date d'ajout du a une erreur lors de la localisation`
    : `Trajets récuperes par trajet plus proche de votre position`;

  const onSearch = async (queryObj) => {
    navigate('/routes/search',{
      state: queryObj
    });

    
  };

  data = data || []; 

  return (
    <>
    <main className="main-section ">
      <section className="w-full bg-bg-green-dark">
        <div className="presentation-wrapper">
          <div className="presentation-part-upper">
            <div className="presentation-left">
              <h1>Explorez le Monde Ensemble avec RideShare</h1>
              <p>
                Découvrez une expérience de voyage exceptionnelle RideShare se
                distingue par sa capacité à répondre à toutes les demandes et
                offres de covoiturage en Algérie. Embarquez avec nous pour un
                moyen de voyage économique, écologique et socialement connecté
              </p>
            </div>

            <div className="presentation-right">
              <img src={presentationIllustration} alt="" />
            </div>
          </div>

          <ResearchBar onSearch={onSearch} />
        </div>
      </section>

      <section className="available-routes">
        <div className="w-8/12 m-auto">
          <div className="header">
            <p>Parcourez les Offres de Covoiturage</p>
            <div className="flex justify-center items-start">
              <h1 className="mr-1">Trajets disponibles</h1>
            </div>
          </div>

          <NearestTrajetsList trajets={data} />

          <div
            onClick={() => {window.scrollTo(0, 0);navigate("/routes/search")}}
            className="btn hover:cursor-pointer rounded-2xl  w-fit m-auto bg-orange text-white text-lg px-4 py-1"
          >
            VOIR PLUS
          </div>
        </div>
      </section>

      <section className="explanations">
        <div className="explanations-wrapper">
          <div className="how-to-header">
            <p>Explorez, choisissez, partez. C'est aussi simple que cela !</p>
            <h3>Comment ça marche ?</h3>
          </div>

          <div className="explanations-steps-wrapper">
            <div className="step step-1">
              <img src={FirstIllustration} alt="First" />
              <div className="step-1-text">
                <h3>
                  Vous n'avez pas trouvé de covoiturage pour votre destination à
                  la date que vous souhaitez ?
                </h3>
                <p>
                  Partagez vos besoins de voyage en publiant une demande sur
                  RideShare. Indiquez votre destination, la date et d'autres
                  préférences pour trouver le trajet parfait.
                </p>
              </div>
            </div>

            <div className="step step-2">
              <div className="step-2-text">
                <h3>Rencontrez des conducteurs prêts à partager leur route</h3>
                <p>
                  Découvrez une liste de Trajets qui correspondent à votre
                  demande. Consultez leurs details, et choisissez celui qui
                  correspond le mieux à vos critères.
                </p>
              </div>
              <img src={SecondIllustration} alt="Second" />
            </div>

            <div className="step step-1">
              <img src={ThirdIllustration} alt="Third" />
              <div className="step-3-text">
                <h3>
                  Sélectionnez le covoiturage parfait et préparez-vous pour un
                  voyage inoubliable
                </h3>
                <p>
                  Explorez les trajets proposés, choisissez celui qui vous
                  convient le mieux , reservez votre place et préparez-vous pour
                  un voyage sans souci. C'est la clé pour une expérience de
                  voyage personnalisée.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default Home;
