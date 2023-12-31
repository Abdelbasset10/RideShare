import { useState } from 'react';
import { useForm, useController} from 'react-hook-form';

import destionationIcon from '../assets/img/icons/icon_destination.png';
import timeIcon from '../assets/img/icons/icon_clock.png';
import dateIcon from '../assets/img/icons/icon_calendar.png';
import researchIcon from '../assets/img/icons/icon_research.png';
import { DatePicker, TimeField } from '@mui/x-date-pickers';


const HomeResearchBar = ({onSearch}) => {

    const [userData,setUserData] = useState({})
    const [errors,setErrors] = useState({})

    const { register , control, handleSubmit } = useForm();

    const { departureField }    = useController({name: 'departure', control})
    const { destinationField }  = useController({name: 'destination', control})
    const { dateField }         = useController({name: 'date', control})
    const { timeField }         = useController({name: 'time', control})


    const {departure,destination,date,time} = userData;
    console.log("🚀 ~ file: HomeResearchBar.jsx:25 ~ HomeResearchBar ~ date:", date)
    console.log("🚀 ~ file: HomeResearchBar.jsx:25 ~ HomeResearchBar ~ time:", time)


    /////////////////////////////////////////////////
    //              onChange Functions
    /////////////////////////////////////////////////
    const onTimeChange = (options) => {
        console.log("🚀 ~ file: HomeResearchBar.jsx:29 ~ onTimeChange ~ options:", options)
        userData.time = {
            hour: options["$H"],
            minutes: options["$m"]
        };
        setUserData(userData)
    }

    const onDateChange = (options) => {
        console.log("🚀 ~ file: HomeResearchBar.jsx:37 ~ onDateChange ~ options:", options)
        userData.date = {
            day: options["$D"],
            month: options["$M"],
            year: options["$Y"]
        };
        setUserData(userData)    
    }   

    const validateData = () => {
        return {}
    }
    
    
    const handleSearch = (formValues) => {
        
    
        //const errors = validateData();
        //
        //if (Object.keys(errors).length) {
        //    setErrors(errors);
        //    return ;
        //}

        setErrors({})
        onSearch(formValues);
    }

    
    return (
        <form onSubmit={handleSubmit(handleSearch)} className="home-research-bar">
           <div className="research-departure">
                <img src={destionationIcon} alt="Destination" />
                <input {...register('departure')} placeholder='Destination Départ' />
            </div>

            <div className="research-destination">
                <img src={destionationIcon} alt="Destination" />
                <input {...register('destionation')} placeholder='Destination Arrivée' />
            </div>     

            <div className="research-date">
                <img src={dateIcon} alt="Date Depart" />
                <DatePicker format="DD:MM:YYYY" onChange={onDateChange} label='Date Départ' />
            </div>     


            <div className="research-time">
                <img src={timeIcon} alt="Heure Depart" />
                <TimeField format="HH:mm" onChange={onTimeChange} label='Heure de Départ' />
            </div>  




             <div className="research-submit">
                <img src={researchIcon} alt="Submit button" />
                <button type='submit'>Rechercher</button>       
            </div>   
    

        </form>
    );
}
 
export default HomeResearchBar;