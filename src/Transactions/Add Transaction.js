import "./Add Transaction.css"
import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setOpacity, validTransaction } from "../utilities.js";

const AddTransaction = ( { categories, addTransaction } ) => {
    const history = useHistory();
    const now = new Date();
    const dateAdded = { year: now.getFullYear(), month: now.getMonth()+1, day: now.getDate() };

    const [ year, setYear ] = useState(dateAdded.year);
    const [ month, setMonth ] = useState(dateAdded.month);
    const [ day, setDay ] = useState(dateAdded.day);
    const [ type, setType ] = useState("expense");
    const [ category, setCategory ] = useState("");
    const [ amount, setAmount ] = useState(0);
    const [ details, setDetails ] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        const categoryID = categories.find( cat => cat.name === category).id;
        const transaction = { categoryID, amount, details, date: {year, month, day}, dateAdded };

        if (validTransaction(transaction)) {
            addTransaction(transaction);
            history.push("/transactions");
        }
    };

    return (
        <div className="add-transaction">
            <form onSubmit={ handleSubmit }>
                <div className="date">
                    <input 
                        type="number" value={year} min={1} max={9999}
                        onChange={ e => {
                            if (parseInt(e.target.value) < e.target.min || parseInt(e.target.value) > e.target.max) setYear(year);
                            else setYear(parseInt(e.target.value));
                        } }>
                    </input>
                    <input 
                        type="number" value={month} min={1} max={12}
                        onChange={ e => {
                            if (parseInt(e.target.value) < e.target.min || parseInt(e.target.value) > e.target.max) setMonth(month);
                            else setMonth(parseInt(e.target.value));
                        } }>
                    </input>
                    <input 
                        type="number" value={day} min={1} max={31}
                        onChange={ e => {
                            if (parseInt(e.target.value) < e.target.min || parseInt(e.target.value) > e.target.max) setDay(day);
                            else setDay(parseInt(e.target.value));
                        } }>
                    </input>
                </div>
                
                <div className="type">
                    <span 
                        onClick={ () => setType("income") } 
                        className={ type === "income" ? "background-color2 type-selected" : "color2 type-unselected" }
                    >
                        INCOME
                    </span>

                    <span 
                        onClick={ () => setType("expense") } 
                        className={ type === "expense" ? "background-color2 type-selected" : "color2 type-unselected" }
                    >
                        EXPENSE
                    </span>
                </div>

                <div className="categories border-color2">
                    {categories.filter(cat => cat.type === type).map( cat => (
                        <span 
                            key={ cat.id } 
                            onClick={ () => setCategory(cat.name) }
                            style={ {backgroundColor:cat.color, opacity:setOpacity(cat.name !== category, 0.35)}}
                        >
                            <h3>{ cat.name }</h3>
                        </span>        
                    ))}
                </div>
                
                <textarea 
                    placeholder="Descriptions..."
                    value={ details }
                    onChange={ e => setDetails(e.target.value) }>
                </textarea>

                <label htmlFor="amount">
                    <h1>Amount: </h1>
                    <input 
                        type="currency" id="amount" value={ amount }
                        onChange={ e => setAmount( e.target.value === "" || parseInt(e.target.value) <= 0 ? 0 : parseInt(e.target.value)) }
                    ></input>
                </label>
                
                <button className="background-color2 hover-color1">Submit</button>
            </form>
        </div>
    );                       
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addTransaction: (transaction) => dispatch( { type: "ADD_TRANSACTION", transaction: transaction } )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);