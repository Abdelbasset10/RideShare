import { useEffect, useState } from "react";
import ResearchBar from "../components/ResearchBar";
import TrajetCard from "../components/TrajetCard.tsx";
import { Trajet } from "../utils/type-interfaces.ts";
import { useFetch } from "../hooks/fetch/useFetch.tsx";
import React from "react";
import { fetchFnc } from "../utils/fetch";
import { errorToast } from "../utils/helpers.ts";



const SearchRoute = () => {

    const [trajets,setTrajets] = useState([])
  

    const [triChecks,setTriChecks] = useState({
      nearest:false,
      price:false,
      seat:false,
      time:false
    })

    const [dataBody,setDataBody] = useState({});

    const filters = [
      {"value":"nearest","label":"Trier par plus proches"},
      {"value":"price","label":"Trier par prix plus bas"},
      {"value":"seat","label":"Trier par place disponibles"},
      {"value":"time","label":"Trier par temps de départ"}
    ]  


    const onTriChange = (type,checked) => {
        triChecks[type] = checked;

        setTriChecks(triChecks); 
        console.log("🚀 ~ onTriChange ~ triChecks:", triChecks);

    }

    const displayTriItems = () => {
      return filters.map((filter) => {
        return (
          <div key={filter.label} className="tri-item-wrapper">
            <label className="research-tri-label" htmlFor={filter.value}>
              {filter.label}
            </label>
            <input
              className="research-tri-input"
              id={filter.value}
              type="checkbox"
              name="test"
              value={filter.value}
              onChange={(e) => onTriChange(e.target.value, e.target.checked)}
            />
          </div>
        );
      });
    }

    const queryOptionsFromTries = () => {
      return {};
    }

   
    useEffect( () => {

      const fetchData = async () => {
  
          try {
            const ret = await fetchFnc({
              url: 'trajet/research',
              method: "GET",
              getQueryOptions: dataBody,
              headers: {},
            })
              setTrajets(ret.data);
              console.log(ret.data);
              
            
            } catch(e) {
              errorToast(e);
              console.log(e);
              
            }
  
        }
  
        fetchData();
     
    },[dataBody])

    

   
    
    const onSearch = (data) => {
      setDataBody(data);
      console.log("body",dataBody);
      
    }

    return (
      <main className="research">
        <div className="research-wrapper">
          <section className="research-header-wrapper">
            <h1>Rechercher un trajet</h1>

            <ResearchBar onSearch={onSearch} />
          </section>

          <section className="research-body">
            <div className="research-body-wrapper">
              <div className="research-filter">
                <h3>Trier par</h3>
                <fieldset className="tri-list">{displayTriItems()}</fieldset>
              </div>

              <div className="research-separator"></div>

              <div className="research-result">
                  {trajets !== undefined && trajets.map((trajet: Trajet) => (
                    <TrajetCard key={trajet.id} trajet={trajet} />
                  ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    );

}
 
export default SearchRoute;