import React, { useContext, useState } from 'react';
import { reservation } from '../../../server/utils/prisma';
import { useForm } from 'react-hook-form';
import { Trajet } from '../utils/type-interfaces.ts';
import { fetchFnc } from '../utils/fetch';
import { AuthContext } from '../contexts/AuthContext.tsx';
import { errorToast, successToast } from '../utils/helpers.ts';


const ReservationPopup = ({ isOpen,trajet } : {isOpen: boolean,trajet: Trajet}) => {

 
    const {register,handleSubmit} = useForm();
    const {user} = useContext(AuthContext);


    const onClick = (data) => {
        fetchFnc({
            url: `trajet/reserver/${trajet.id}`,
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${user?.apiKey}`,
              },
            data: {
                userId: user?.id,
                nb_places: data.nb_places
            }
        }).then((e) => successToast("Reservation crée avec succès")).catch((e) => errorToast(e));
        
    } 
    return (
    <>
    {isOpen && (
    <div className='popup-reservation'>
        <div className="popup-wrapper">
                <form onSubmit={handleSubmit(onClick)}>
                    <p>Vous allez reserver des places pour le chemin de {trajet.position_start.name} à {trajet.position_end.name}</p>

                    <label htmlFor="nb_places">Nombre de places:</label>
                    <input type="number" id='nb_places' {...register("nb_places")} />

                    <button type='submit' >Submit</button>
                </form>
        </div>
    </div>)} 

    {!isOpen && null}
    </>
    );
}
 
export default ReservationPopup;
