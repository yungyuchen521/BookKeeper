import "./Transaction.css"
import { connect } from "react-redux";
import { getCategory, summary } from "../utilities.js";

const Transation = ( { transaction, categories, setWindowID } ) => {
    const category = getCategory(categories, transaction.categoryID);

    return (
        <div className="transaction" onClick={ () => setWindowID(transaction.id) }>    
            <h3 id="category" style={ {backgroundColor:category.color }}>{ category.name.toUpperCase() }</h3>
            <p id="details">{ summary(transaction.details, 20) }</p>
            <h2 id="amount" style={ {backgroundColor:category.color }}>
                $ { category.type === "income" ? "" : "-" }{ transaction.amount }
            </h2>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}
 
export default connect(mapStateToProps)(Transation);