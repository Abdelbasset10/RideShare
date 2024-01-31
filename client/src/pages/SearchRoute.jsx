import { useState } from "react";
import ResearchBar from "../components/ResearchBar";
import TrajetCard from "../components/TrajetCard";



const SearchRoute = () => {

    const [triChecks,setTriChecks] = useState({
      nearest:false,
      price:false,
      seat:false,
      time:false
    })

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
          <div className="tri-item-wrapper">
            <label className="research-tri-label" for={filter.value}>
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

   
    
    return (
      <main className="research">
        <div className="research-wrapper">
          <section className="research-header-wrapper">
            <h1>Rechercher un trajet</h1>

            <ResearchBar />
          </section>

          <section className="research-body">
            <div className="research-body-wrapper">
              <div className="research-filter">
                <h3>Trier par</h3>
                <fieldset className="tri-list">{displayTriItems()}</fieldset>
              </div>

              <div className="research-separator"></div>

              <div className="research-result">
                <TrajetCard trajet={{}} />
                <TrajetCard trajet={{}} />
                <TrajetCard trajet={{}} />
                <TrajetCard trajet={{}} />
                <TrajetCard trajet={{}} />
                <TrajetCard trajet={{}} />
                <TrajetCard trajet={{}} />
              </div>
            </div>
          </section>
        </div>
      </main>
    );

}
 
export default SearchRoute;