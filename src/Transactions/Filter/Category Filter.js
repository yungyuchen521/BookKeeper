import "./Category Filter.css";
import { getCategory } from "../../utilities.js";

const CategoryFilter = ( { type, categories, selectedCategories, setSelectedCategories } ) => {

    const allCategories = [];
    categories.forEach( cat => allCategories.push(cat.id));

    const selectAll = () => setSelectedCategories(selectedCategories.concat(allCategories));
    
    const unselectAll = () => setSelectedCategories(selectedCategories.filter( id => !getCategory(categories, id)));
    
    return (
        <div className="category-filter">

            <h3 className="color2">{ type.toUpperCase() }</h3>

            <div className="categories">
                { categories.map( cat => (
                    <div key={ cat.id } className="category">
                        <span 
                            onClick={ () => { 
                                if (!selectedCategories.includes(cat.id)) setSelectedCategories([...selectedCategories, cat.id]);
                                else setSelectedCategories(selectedCategories.filter( id => id !== cat.id));
                            }}
                        >
                            <div className={ selectedCategories.includes(cat.id) ? "checkbox background-color2" : "checkbox"}></div> 
                            { cat.name }
                        </span>
                    </div>
                ))} 
            </div>

            <button onClick={ selectAll }>Select All</button>
            <button onClick={ unselectAll }>Unselect All</button>

        </div>
    );
}

export default CategoryFilter;