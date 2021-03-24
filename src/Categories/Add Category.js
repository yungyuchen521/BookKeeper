import "./Add Category.css";
import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const AddCategory = ( { categories, addCategory } ) => {
    const history = useHistory();

    const [ type, setType ] = useState("income");
    const [ name, setName ] = useState("");
    const [ color, setColor ] = useState("black");

    const handleSubmit = e => {
        e.preventDefault();

        if (categories.find( cat => cat.type === type && cat.name === name) !== undefined) {
            alert("The name exist already!");
        }

        else {
            const category = { type, name, total: 0, color };
            addCategory(category);
            history.push("/categories");
        }
    }

    return (
        <div className="add-category">
            <form onSubmit={ handleSubmit }>
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

                <div className="name">
                    <label htmlFor="name"><h1>Name: </h1></label>
                    <input id="name"
                        type="text"
                        required
                        value={ name }
                        onChange={ e => setName(e.target.value) }>
                    </input>
                </div>
                
                <div className="color">
                    <label htmlFor="color"><h1>Color: </h1></label>
                    <input id="color"
                        type="color"
                        required
                        value={ color }
                        onChange={ e => setColor(e.target.value) }>
                    </input>
                </div>
                

                <button className="background-color2 color3">Submit</button>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCategory: (category) => dispatch({type: "ADD_CATEGORY", category: category})
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);