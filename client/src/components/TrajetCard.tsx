import ProfileImage from '../assets/img/illustrations/profile_1.png'
import PositionIcon from '../assets/img/icons/icon_position.png'
import TimeIcon from '../assets/img/icons/icon_clock.png'
import VehicleIcon from '../assets/img/icons/icon_vehicle.png'
import SeatsIcon from '../assets/img/icons/icon_profile_white.png'
import PositionSeparator from '../assets/img/icons/position_separator.png'
import React, { useState } from 'react'
import { Trajet } from '../utils/type-interfaces.ts'
import ReservationPopup from './ReservationPopup.tsx'

interface TrajetCardProps {
  trajet: Trajet
}

const TrajetCard = ({trajet} : TrajetCardProps) => {

  const [isOpenPop,setIsOpenPop] = useState(false);


    return (
      <>
      <ReservationPopup isOpen={isOpenPop} trajet={trajet} />  
      <div className="trajet-card h-full">

        <div className="trajet-upper">
          <div className="trajet-upper-left">
            <p className="trajet-date">{trajet.start_date}</p>
            <p className="trajet-prix">{trajet.price} DA</p>
          </div>

          <div className="trajet-upper-right">
            <img src={ProfileImage} alt="Profile" />
            <p className="trajet-prix">{trajet.chauffeur?.first_name}</p>
          </div>
        </div>

        <div className="trajet-middle">
          <div>
            <div className="position-depart">
              <img src={PositionIcon} alt="Position" />
              <p>{trajet.position_start?.name}</p>
            </div>

            <img
              className="position-separator"
              src={PositionSeparator}
              alt=""
            />

            <div className="position-destination">
              <img src={PositionIcon} alt="Position" />
              <p>{trajet.position_end?.name}</p>
            </div>
          </div>

          <button onClick={() => setIsOpenPop(true)} className='reserve-btn'>Réserver</button>  
        </div>

        <div className="trajet-lower">
          <div className="informations informations-time">
            <img src={TimeIcon} alt="Time" />
            <p>{trajet.hour_start}</p>
          </div>

          <div className="informations col-span-3 informations-vehicle">
            <img src={VehicleIcon} alt="Time" />
            <p>{trajet.car.marque} {trajet.car.model}</p>
          </div>

          <div className="informations informations-seat">
            <img src={SeatsIcon} alt="Time" />
            <p>{trajet.nb_place}</p>
          </div>
        </div>
      </div>
      </>
    );
}
 
export default TrajetCard;