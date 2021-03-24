import "./Sorter.css"

const Sorter = ( { sortBy, setSortBy, ascending, setAscending } ) => {
    return (
        <div className="sorter">
            <h1>Sort By</h1>

            <select value={ sortBy }
                    onChange={ e => setSortBy(e.target.value) }>
                <option value="dateAdded">date added</option>
                <option value="date">date</option>
                <option value="amount">amount</option>
            </select>

            <select value={ ascending }
                    onChange={ e => setAscending( (e.target.value === "true" ? true : false) ) }>
                <option value="true">ascending</option>
                <option value="false">descending</option>
            </select>
        </div>
    );
}
 
export default Sorter;