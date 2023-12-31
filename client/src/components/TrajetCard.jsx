import ProfileImage from '../assets/img/illustrations/profile_1.png'
import PositionIcon from '../assets/img/icons/icon_position.png'
import TimeIcon from '../assets/img/icons/icon_clock.png'
import VehicleIcon from '../assets/img/icons/icon_vehicle.png'
import SeatsIcon from '../assets/img/icons/icon_profile_white.png'
import PositionSeparator from '../assets/img/icons/position_separator.png'

const TrajetCard = ({trajet}) => {
    return (
        <div className="trajet-card">
            
            
            <div className="trajet-upper">
                <div className="trajet-upper-left">
                    <p className="trajet-date">23/12/2023</p>
                    <p className="trajet-prix">250,00 DA</p>
                </div>

                <div className="trajet-upper-right">
                    <img src={ProfileImage} alt="Profile" />
                    <p className="trajet-prix">Sarah</p>
                </div>
            </div>


            <div className="trajet-middle">
                <div className="position-depart">
                    <img src={PositionIcon} alt="Position" />
                    <p>Départ</p>
                </div>

                <img className='position-separator' src={PositionSeparator } alt="" />

                <div className="position-destination">
                    <img src={PositionIcon} alt="Position" />
                    <p>Destination</p>
                </div>
            </div>   

            <div className="trajet-lower">
                <div className="informations informations-time">
                    <img src={TimeIcon} alt="Time" />
                    <p>09:00</p>
                </div>

                <div className="informations informations-vehicle">
                    <img src={VehicleIcon} alt="Time" />
                    <p>Type Auto</p>
                </div>

                <div className="informations informations-seat">
                    <img src={SeatsIcon} alt="Time" />
                    <p>3</p>
                </div>
            </div>   
        </div>
    );
}
 
export default TrajetCard;