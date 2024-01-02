const TriItem = ({label,id,isChecked,onValueChange}) => {

    const onChange = (event) => {
        const isChecked = event.target.isChecked;
            
    } 

    return (
        <li className="tri-list-item">
             <input type="checkbox" checked onChange={(info) => {
                 
            
             }} id={id}   />
             <label htmlFor={id} > {label} </label>
        </li>
    );
}
 
export default TriItem;