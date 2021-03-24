import "./Amount Filter.css";

const AmountFilter = ( { selectedAmount, setSelectedAmount } ) => {
    return (
        <div className="amount-filter">
            <h3 className="color2">Amount</h3>
            <input type="number" className="min" min={0} placeholder="min" value={ selectedAmount.min } onChange={ e => {
                if (parseInt(e.target.value) >= e.target.min) setSelectedAmount({ min: parseInt(e.target.value), max: selectedAmount.max });
                else setSelectedAmount(selectedAmount);
            }}/>
            <span> ~ </span>
            <input type="number" className="max" max={Infinity} placeholder="MAX" value={ selectedAmount.max } onChange={ e => {
                if (parseInt(e.target.value) <= e.target.max) setSelectedAmount({ min: selectedAmount.min, max: parseInt(e.target.value) });
                else setSelectedAmount(selectedAmount);
            }}/>
        </div>
    );
}
 
export default AmountFilter;