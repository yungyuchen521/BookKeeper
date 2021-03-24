import "./Category Details.css";
import { connect } from "react-redux";
import { useState } from "react";

const CategoryDetails = ( { categories, deleteCategory, editCategory, id, setWindowID } ) => {
    const category = categories.find(cat => cat.id === id);

    const [ edit, setEdit ] = useState(false);
    const [ type, setType ] = useState(category.type);
    const [ name, setName ] = useState(category.name);
    const [ color, setColor ] = useState(category.color);

    const handleClickButton = e => {
        e.preventDefault();

        if (edit) handleEdit();
        else handleDelete();
    }

    const handleDelete = () => {
        setWindowID("");
        deleteCategory(category.id);
    }

    const handleEdit = () => {
        setEdit(false);
        const cat = { type, name, total: category.total, color, id };
        editCategory(cat);
    }

    return (
        <div className="category-details">
            {category && <div className="category-details">
                <div className="top" style={{ backgroundColor:category.color }}>
                    <span className="close" onClick={ () => setWindowID("") }>X</span>
                    <span className="edit" onClick={ () => setEdit(true) }>Edit</span>
                </div>

                <div className="container">
                    <h2 className="subtitle type color2">Type: 
                        { !edit && <span className="info">{ category.type }</span> }
                        { edit && <span className="edit info">
                            <span onClick={ () => setType("income") } className={ type === "income" ? "background-color2 color3" : "color2" }>
                                INCOME
                            </span>

                            <span onClick={ () => setType("expense") } className={ type === "expense" ? "background-color2 color3" : "color2" }>
                                EXPENSE
                            </span>
                        </span> }
                    </h2>

                    <h2 className="subtitle name color2">Name: 
                        { !edit && <span className="info">{ category.name }</span> }
                        { edit && <span className="info">
                            <input value={ name } onChange={ e => setName(e.target.value) }></input>
                        </span> }
                    </h2>

                    <h2 className="subtitle total color2">Total: <span className="total info">${ category.total }</span></h2>

                    { edit && <h2 className="subtitle color color2">Color:
                        <span className="info">
                            <input className="color2" type="color" value={ color } onChange={ e => setColor(e.target.value) }></input>
                        </span>
                    </h2> }

                    <button 
                        style={{ backgroundColor:category.color }} 
                        onClick={ handleClickButton }>
                        { edit ? "Save" : "Delete" } 
                    </button>
                </div>
            </div>}
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
        deleteCategory: id => dispatch( { type: "DELETE_CATEGORY", id } ),
        editCategory: category => dispatch( { type: "EDIT_CATEGORY", category } )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetails);