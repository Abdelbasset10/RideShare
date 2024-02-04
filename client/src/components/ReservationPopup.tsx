import React, { useContext, useState } from 'react';
import { reservation } from '../../../server/utils/prisma';
import { useForm } from 'react-hook-form';
import { Trajet } from '../utils/type-interfaces.ts';
import { fetchFnc } from '../utils/fetch';
import { AuthContext } from '../contexts/AuthContext.tsx';
import { errorToast, successToast } from '../utils/helpers.ts';


const ReservationPopup = ({ setIsOpenPop,isOpen,trajet } : {setIsOpenPop: any,isOpen: boolean,trajet: Trajet}) => {

 
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
        }).then((e) => {
            setIsOpenPop(false);
            successToast("Reservation crée avec succès")}).catch((e) => errorToast(e));
        
    } 
    return (
    <>
    {isOpen && (
    <div className='popup-reservation Z-50'>
        <div className="popup-wrapper">
                <button onClick={() => setIsOpenPop(false)}>Fermer</button>
                <form className='popup-content' onSubmit={handleSubmit(onClick)}>
                    <h1 className='mb-10 text-3xl font-bold text-orange'>Reservez vos places</h1>
                    <p className='mb-8'>Vous allez reserver des places pour le chemin de <br/> <span className='underline mx-3'>{trajet.position_start.name}</span> à <span className='underline mx-3'>{trajet.position_end.name}</span></p>

                    <div className='flex justify-center items-center bg-beige py-3 px-7 rounded-xl w-fit m-auto'>
                        <label className='mr-4' htmlFor="nb_places">Nombre de places</label>
                        <input type="number" id='nb_places' {...register("nb_places")} />
                    </div>


                    <button type='submit' className='mt-4 bg-bg-green-dark text-white px-8 py-1 rounded-xl'>Submit</button>
                </form>
        </div>
    </div>)} 

    {!isOpen && null}
    </>
    );
}
 
export default ReservationPopup;
