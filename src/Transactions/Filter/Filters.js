import "./Filters.css";
import "./Category Filter.js";
import "./Amount Filter.js";
import { useState } from "react";
import { connect } from "react-redux";
import AmountFilter from "./Amount Filter.js";
import CategoryFilter from "./Category Filter.js";
import DateFilter from "./Date Filter.js";

const Filters = ( { 
    categories,
    filterCategories, setFilterCategories, 
    filterAmount, setFilterAmount, 
    filterDate, setFilterDate, 
    filterDateAdded, setFilterDateAdded } ) => {

    const [ expandFilter, setExpandFilter ] = useState(false);
    const [ selectedCategories, setSelectedCategories ] = useState(filterCategories);
    const [ selectedAmount, setSelectedAmount ] = useState(filterAmount);
    const [ selectedDate, setSelectedDate ] = useState(filterDate);
    const [ selectedDateAdded, setSelectedDateAdded ] = useState(filterDateAdded);

    return (
        <div className="filters">
            <h1 >Filter</h1>
            <button className="background-color2 color3" onClick={ () => setExpandFilter(!expandFilter) }>{ expandFilter ? "Close" : "Expand"}</button>
            <button 
                className="background-color2 color3"
                onClick={ () => { 
                    setFilterCategories(selectedCategories);
                    setFilterAmount(selectedAmount);
                    setFilterDate(selectedDate);
                    setFilterDateAdded(selectedDateAdded);
                    setExpandFilter(false);
            } }>Apply</button>

            <div className="filters-window border-color2" style={ {visibility:( expandFilter ? "visible" : "hidden") }}>
                <CategoryFilter type={ "income" } categories={ categories.filter(cat => cat.type === "income") } selectedCategories={ selectedCategories } setSelectedCategories={ setSelectedCategories }/>
                <CategoryFilter type={ "expense" } categories={ categories.filter(cat => cat.type === "expense") } selectedCategories={ selectedCategories } setSelectedCategories={ setSelectedCategories }/>
                <AmountFilter selectedAmount={ selectedAmount } setSelectedAmount={ setSelectedAmount }/>
                <DateFilter title={"Date"} selectedDate={ selectedDate } setSelectedDate={ setSelectedDate }/>
                <DateFilter title={"Date Added"} selectedDate={ selectedDateAdded } setSelectedDate={ setSelectedDateAdded }/>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return { categories: state.categories };
}
 
export default connect(mapStateToProps)(Filters);