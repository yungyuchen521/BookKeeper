import "./Category List.css";
import { Link } from "react-router-dom";

const CategoryList = ( { categories, setWindowID } ) => {
    const title = (categories[0].type === "income") ? "INCOMES" : "EXPENSES";

    return (
        <div className="category-list">
            <h1 className="title background-color2">{ title }</h1>
            <div className="container">
                {categories.map(cat => (
                    <span key={cat.id} className="category" onClick={ () => setWindowID(cat.id) }>
                        <span className="name" style={ {backgroundColor:cat.color }}><h1>{ cat.name.toUpperCase() }</h1></span>
                        <span className="total"><h1>Total: ${ cat.total }</h1></span>
                    </span>        
                ))}

                <Link to="/addCategory">
                    <span className="category new">
                        <span className="name background-color2"><h1>+</h1></span>
                        <span className="total"><h1>New Category</h1></span>
                    </span>
                </Link>
            </div>
        </div>
    );
}
 
export default CategoryList;