import { connect } from "react-redux";
import { useState } from "react";
import { compareDate, compareTransactions, setOpacity } from "../utilities.js";
import DailyTransaction from "./Daily Transaction.js";
import TransactionDetails from "../Transactions/Transaction Details.js";

const Home = ( { transactions } ) => {
    const [ windowID, setWindowID ] = useState("");

    transactions.sort( (a, b) => compareTransactions(a, b, "date", false) );

    var day = transactions[0].date;
    var groups = [[]];

    transactions.forEach( trans => {
        if (compareDate(day, trans.date) > 0) {
            day = trans.date;
            groups.push([]);
        }
            
        groups[groups.length-1].push(trans);
    });
    
    return (
        <div className="home">
            <div className="window">
                { windowID && <div><TransactionDetails id={ windowID } setWindowID={ setWindowID }/></div>}
            </div>

            <div style={{ opacity:setOpacity(windowID, 0.5) }}>
                {groups.map( group => (
                    <DailyTransaction key={group[0].id} group={group} setWindowID={ setWindowID }/>
                ) )}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        transactions: JSON.parse(JSON.stringify(state.transactions))
    }
}

export default connect(mapStateToProps)(Home);