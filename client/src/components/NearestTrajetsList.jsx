import Slider from "react-slick";
import TrajetCard from "./TrajetCard.tsx";

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
 
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }


const NearestTrajetsList = ({trajets}) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        slidesToShow: 3,
        slidesToScroll: 1
      };



    return (
        <div className="cards-list">
            <Slider {...settings}>

                  {trajets.map((trajet) => {
                    console.log(trajet.id);
                    return <TrajetCard trajet={trajet} />
                  })}
                 
            </Slider>    
        </div>
    );
}
 
export default NearestTrajetsList;