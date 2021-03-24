import Transation from "./Transaction";
import "./Daily Transaction.css";
import { connect } from "react-redux";
import { getCategory } from "../utilities.js";

const DailyTransaction = ( { categories, group, setWindowID } ) => {
    var total = 0;
    group.forEach(entry => {
        const amount = parseInt(entry.amount);
        total += (getCategory(categories, entry.categoryID).type === "income") ? amount : -amount;
    });
    

    return (
        <div className="daily-transaction">
            <div className="date background-color2">
                <h1>{group[0].date.year} / {group[0].date.month} / {group[0].date.day}</h1>
            </div>
            <div className="container"> {
                group.map( transaction => (
                    <span key={transaction.id}><Transation transaction={transaction} setWindowID={ setWindowID }/></span>
                ))
            }</div>
            <div className="total background-color2">
                <h1>Total: $ {total}</h1>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    };
}
 
export default connect(mapStateToProps)(DailyTransaction);