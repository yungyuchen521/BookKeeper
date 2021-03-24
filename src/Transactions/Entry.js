import { getCategory, summary } from "../utilities.js";
import { connect } from "react-redux";

const Entry = ( { transaction, categories, setWindowID } ) => {
    const category = getCategory(categories, transaction.categoryID);

    return (
        <div className="entry" 
             style={{border:`3px solid ${category.color}`}}
             onClick={ () => setWindowID(transaction.id) }
        >

                    <span className="category">
                        <h3 style={ {color:category.color }}>{ category.name.toUpperCase() }</h3>
                    </span>
                        
                    <span className="details" style={ {backgroundColor:category.color }}>
                        <p>{ summary(transaction.details, 20) }</p>
                    </span>

                    <span className="date" style={ {backgroundColor:category.color }}>
                        <p>{ transaction.date.year } / { transaction.date.month } / { transaction.date.day }</p>
                    </span>
                        
                    <span className="amount">
                        <h1>
                            $ { category.type === "income" ? "" : "-" }{ transaction.amount }
                        </h1>
                    </span>

        </div>
    );
}

const mapStateToProps = state => {
    return { categories: state.categories };
}
 
export default connect(mapStateToProps)(Entry);