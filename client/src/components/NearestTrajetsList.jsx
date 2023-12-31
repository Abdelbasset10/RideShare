import Slider from "react-slick";
import TrajetCard from "./TrajetCard";


const NearestTrajetsList = ({trajets}) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2
      };



    return (
        <div className="cards-list">
            <Slider {...settings}>
                 <TrajetCard trajet={{}} />
                 <TrajetCard trajet={{}} />
                 <TrajetCard trajet={{}} />
                 <TrajetCard trajet={{}} />
                 <TrajetCard trajet={{}} />
                 <TrajetCard trajet={{}} />
                 <TrajetCard trajet={{}} />
                 <TrajetCard trajet={{}} />
            </Slider>    
        </div>
    );
}
 
export default NearestTrajetsList;