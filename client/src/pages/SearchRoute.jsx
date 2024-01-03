import { useState } from "react";
import ResearchBar from "../components/ResearchBar";
import TriItem from "../components/TriItem";
import { useFetch } from "../hooks/fetch/useFetch"; 



const SearchRoute = () => {

    const [triChecks,setTriChecks] = useState({})

    const {data,loading,error} = useFetch('')
    
    const onTriChange = (type,checked) => {
        triChecks[type] = checked;

        setTriChecks(triChecks); 
    }

    return (
      <main className="research">
        <section className="research-header">
          <div className="research-header-wrapper">
            <h1>Rechercher un trajet</h1>
          </div>

          <ResearchBar />
        </section>

        <section className="research-body">
            <div className="research-body-wrapper">
            <div className="research-tri">
                <h3>Trier par</h3>
                <ul className="tri-list">
                    <TriItem label="Trier par plus proches"      id="nearest"  onValueChange={onTriChange} />
                    <TriItem label="Trier par prix plus bas"     id="price"  onValueChange={onTriChange} />
                    <TriItem label="Trier par place disponibles" id="seat"  onValueChange={onTriChange} />
                    <TriItem label="Trier par temps de départ"   id="time"  onValueChange={onTriChange} />
                </ul>
            </div>
            </div>
        </section>
      </main>
    );

}
 
export default SearchRoute;