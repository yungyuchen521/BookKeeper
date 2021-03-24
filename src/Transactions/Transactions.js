import "./Transactions.css";

import Sorter from "./Sorter.js";
import Filters from "./Filter/Filters.js";
import Entries from "./Entries.js";
import TransactionDetails from "./Transaction Details.js";

import { connect } from "react-redux";
import { compareTransactions, compareDate, setOpacity } from "../utilities.js";
import { useState } from "react";


const Transactions = ( { transactions, categories } ) => {
    var list = [];
    categories.forEach( cat => list.push(cat.id));

    const [ windowID, setWindowID ] = useState("");

    const [ sortBy, setSortBy ] = useState("dateAdded");
    const [ ascending, setAscending ] = useState(true);

    const [ filterCategories, setFilterCategories ] = useState(list);
    const [ filterAmount, setFilterAmount ] = useState({ min: 0, max: Infinity });
    const [ filterDate, setFilterDate ] = useState({ min: { year: 0, month: 1, day: 1 }, max: { year: 9999, month: 12, day: 31 } });
    const [ filterDateAdded, setFilterDateAdded ] = useState({ min: { year: 0, month: 1, day: 1 }, max: { year: 9999, month: 12, day: 31 } });

    return (
        <div className="transactions-list">
            <div className="window">
                { windowID && <div><TransactionDetails id={ windowID } setWindowID={ setWindowID }/></div> }
            </div>

            <div style={{ opacity:setOpacity(windowID, 0.5) }}>
                <div className="filters-container">
                    <Filters 
                        filterCategories={ filterCategories }
                        setFilterCategories={ setFilterCategories }

                        filterAmount={ filterAmount }
                        setFilterAmount={ setFilterAmount }
                        
                        filterDate={ filterDate }
                        setFilterDate={ setFilterDate }

                        filterDateAdded={ filterDateAdded }
                        setFilterDateAdded={ setFilterDateAdded }
                        >
                    </Filters>   
                </div>
                
                <div className="sorter-container">
                    <Sorter 
                        sortBy={ sortBy } 
                        ascending={ ascending } 
                        setSortBy={ setSortBy } 
                        setAscending={ setAscending }>
                    </Sorter> 
                </div>
                
                <Entries 
                    transactions={ transactions.filter( 
                        entry => {
                            return filterCategories.includes(entry.categoryID) && 
                                   parseInt(entry.amount) >= filterAmount.min && 
                                   parseInt(entry.amount) <= filterAmount.max &&
                                   compareDate(entry.date, filterDate.min) >= 0 &&
                                   compareDate(entry.date, filterDate.max) <= 0 &&
                                   compareDate(entry.dateAdded, filterDateAdded.min) >= 0 &&
                                   compareDate(entry.dateAdded, filterDateAdded.max) <= 0;
                        }).sort(
                            (a, b) => compareTransactions(a, b, sortBy, ascending) 
                    )} 
                    setWindowID={ setWindowID }
                >
                </Entries>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        transactions: JSON.parse(JSON.stringify(state.transactions)),
        categories: state.categories
    };
};

export default connect(mapStateToProps)(Transactions);