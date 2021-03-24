import "./Transaction Details.css";
import { useState } from "react";
import { connect } from "react-redux";
import { getCategory, getColor, validTransaction, setOpacity } from "../utilities.js";

const TransactionDetails = ( { transactions, categories, deleteTransaction, editTransaction, id, setWindowID } ) => {
    const transaction = transactions.find(trans => trans.id === id);
    const category = getCategory(categories, transaction.categoryID);
    
    const [ edit, setEdit ] = useState(false);

    const [ year, setYear ] = useState(transaction.date.year);
    const [ month, setMonth ] = useState(transaction.date.month);
    const [ day, setDay ] = useState(transaction.date.day);
    const [ type, setType ] = useState(category.type);
    const [ categoryID, setCategoryID ] = useState(transaction.categoryID);
    const [ amount, setAmount ] = useState(transaction.amount);
    const [ details, setDetails ] = useState(transaction.details);

    const handleClickButton = e => {
        e.preventDefault();

        if (edit) handleEdit();
        else handleDelete();
    }

    const handleDelete = () => {
        setWindowID("");
        deleteTransaction(transaction);
    }

    const handleEdit = () => {
        const newTransaction = { categoryID, amount, details, date: { year, month, day }, dateAdded: transaction.dateAdded, id };

        if (validTransaction(newTransaction)) {
            setEdit(false);
            editTransaction(transaction, newTransaction);
        }
    }

    return (
        <div className="transaction-details">
            { transaction && <div>
                <div className="top" style={{ backgroundColor:category.color }}>
                    <span className="close" onClick={ () => setWindowID("") }>X</span>
                    <span className="edit" onClick={ () => setEdit(true) }>Edit</span>
                </div>
                
                <div className="container">

                    <h2 className="subtitle date color2">Date: 
                        { !edit && <span className="info">{transaction.date.year} / {transaction.date.month} / {transaction.date.day}</span> }

                        { edit && <span className="edit info">
                            <input type="number" value={ year } min={1} max={9999} onChange={ e => { 
                                if (parseInt(e.target.value) > e.target.max || parseInt(e.target.value) < e.target.min) setYear(year);
                                else setYear(parseInt(e.target.value));
                            } }></input>

                            <input type="number" value={ month } min={1} max={12} onChange={ e => { 
                                if (parseInt(e.target.value) > e.target.max || parseInt(e.target.value) < e.target.min) setMonth(month);
                                else setMonth(parseInt(e.target.value));
                            } }></input>

                            <input type="number" value={ day } min={1} max={31} onChange={ e => { 
                                if (parseInt(e.target.value) > e.target.max || parseInt(e.target.value) < e.target.min) setDay(day);
                                else setDay(parseInt(e.target.value));
                            } }></input>
                        </span> }
                    </h2>

                    <h2 className="subtitle type color2">Type:
                        { !edit && <span className="info">{ category.type }</span> }
                        { edit && <span className="edit info">
                            <span onClick={ () => setType("income") } className={ type === "income" ? "background-color2 type-selected" : "color2 type-unselected" }>
                                INCOME
                            </span>

                            <span onClick={ () => setType("expense") } className={ type === "expense" ? "background-color2 type-selected" : "color2 type-unselected" }>
                                EXPENSE
                            </span>
                        </span> }
                    </h2>

                    <h2 className="subtitle category color2">Category: 
                        { !edit && <span className="info">{ category.name }</span> }

                        { edit && <span className="info categories-list">
                            {categories.filter(cat => cat.type === type).map( cat => (
                                <span key={ cat.id } onClick={ () => setCategoryID(cat.id) } style={ {backgroundColor:cat.color, opacity:setOpacity(cat.id !== categoryID, 0.35)}}> 
                                    { cat.name }
                                </span>        
                            ))}
                        </span> }
                    </h2>

                    <h2 className="subtitle amount color2">Amount: 
                        { !edit && <span className="amount info">${ transaction.amount }</span> }

                        { edit && <span className="info">
                            <input type="currency" id="amount" value={ amount } onChange={ e => setAmount( e.target.value === "" ? 0 : parseInt(e.target.value)) }></input>
                        </span> }
                    </h2>
                    
                    <div className="bar"></div>

                    <p className="details">
                        { !edit && transaction.details }

                        { edit && <textarea value={ details } onChange={ e => setDetails(e.target.value) }></textarea>}
                    </p>

                    <div className="bar"></div>

                    <p className="dateAdded">Date Added: {transaction.dateAdded.year} / {transaction.dateAdded.month} / {transaction.dateAdded.day}</p>

                    <button 
                        style={{ backgroundColor:getColor(categories, transaction.categoryID) }} 
                        onClick={ handleClickButton }>
                        { edit ? "Save" : "Delete" } 
                    </button>
                </div>
            </div> }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        transactions: state.transactions,
        categories: state.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteTransaction: (transaction) => dispatch( { type: "DELETE_TRANSACTION", transaction } ),
        editTransaction: (oldTransaction, newTransaction) => dispatch( { type: "EDIT_TRANSACTION", oldTransaction, newTransaction } )
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetails);