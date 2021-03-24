import "./Entry.js";
import "./Entries.css";
import { Link } from "react-router-dom";
import Entry from "./Entry.js";

const Entries = ( { transactions, setWindowID } ) => {


    return (
        <div className="entries">
            { transactions.map( transaction => (
                <Entry key={ transaction.id } transaction={ transaction } setWindowID={ setWindowID }/>
            ))}

            <Link to="/addTransaction"><div className="entry new"><h1>New Transaction</h1></div></Link>
        </div>
    );
}
 
export default Entries;