import CategoryList from "./Category List";
import CategoryDetails from "./Category Details.js";
import { connect } from "react-redux";
import { useState } from "react";
import { setOpacity } from "../utilities.js";

const Categories = ( {categories} ) => {
    const incomes = categories.filter(cat => cat.type === "income");
    const expenses = categories.filter(cat => cat.type === "expense");

    const [ windowID, setWindowID] = useState("");

    return (
        <div className="categories">
            <div className="window">
                { windowID && <CategoryDetails id={ windowID } setWindowID={ setWindowID }/>}
            </div>

            <div style={{ opacity:setOpacity(windowID, 0.5) }}>
                <CategoryList categories={incomes} setWindowID={ setWindowID }/>
                <CategoryList categories={expenses} setWindowID={ setWindowID }/>
            </div>
        </div>
    );
}
 
const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(Categories);