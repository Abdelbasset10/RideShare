import { useState } from 'react';
import presentationIllustration from '../assets/img/illustrations/illustration_home_page_about.png';
import HomeResearchBar from '../components/HomeResearchBar';
import Slider from "react-slick";
import NearestTrajetsList from '../components/NearestTrajetsList';


const Home = () => {

    const [userData,setUserData] = useState({});
    const trajets = {
        trajets: [
            {}
        ]
    }

    const onSearch = (e) => {
        console.log("🚀 ~ file: Home.jsx:11 ~ onSearch ~ e:", e)
    }
    return (
        <section className="main-section">
            <div className="presentation-wrapper">
                <div className="presentation-part-upper">

                <div className="presentation-left">
                    <h1>Explorez le Monde Ensemble avec RideShare</h1> 
                    <p>Découvrez une expérience de voyage exceptionnelle  RideShare se distingue par sa capacité à répondre à toutes les demandes et offres de covoiturage en Algérie. Embarquez avec nous pour un moyen de voyage économique, écologique et socialement connecté</p>
                </div>

                <div className="presentation-right">
                    <img src={presentationIllustration} alt="" />
                </div>
                </div>

                
                <HomeResearchBar onSearch={onSearch} />     
                
            </div>

            <section className="available-routes">
                <div className='w-8/12 m-auto'>

                <div className="header">
                    <p>Parcourez les Offres de Covoiturage</p>
                    <h1>Trajets disponibles</h1>
                </div>

                <NearestTrajetsList trajets={trajets}  />
                </div>

            </section>
        </section>
    );
}
 
export default Home;