import "./Date Filter.css";

const DateFilter = ( { title, selectedDate, setSelectedDate } ) => {
    return (
        <div className="date-filter">
            <h3 className="color2">{ title }</h3>

            <div className="min">
                <input type="number" value={ selectedDate.min.year }
                    onChange={ e => { setSelectedDate(() => {
                        return {
                            ...selectedDate,
                            min: { ...selectedDate.min,
                                year: ( ( e.target.value === "" || parseInt(e.target.value) <= 0 || isNaN(e.target.value) ) ? "0" : parseInt(e.target.value) )
                            }
                        }
                    });
                }}>
                </input>

                <input type="number" value={ selectedDate.min.month }
                    onChange={ e => { setSelectedDate(() => {
                        return {
                            ...selectedDate,
                            min: { ...selectedDate.min,
                                month: ( ( e.target.value === "" || parseInt(e.target.value) <= 0 || isNaN(e.target.value) ) ? "0" : parseInt(e.target.value) )
                            }
                        }
                    });
                }}>
                </input>

                <input type="number" value={ selectedDate.min.day }
                    onChange={ e => { setSelectedDate(() => {
                        return {
                            ...selectedDate,
                            min: { ...selectedDate.min,
                                day: ( ( e.target.value === "" || parseInt(e.target.value) <= 0 || isNaN(e.target.value) ) ? "0": parseInt(e.target.value) )
                            }
                        }
                    });
                }}>
                </input>
            </div>

            <p>to</p>

            <div className="max">
                <input type="number" value={ selectedDate.max.year }
                    onChange={ e => { setSelectedDate(() => {
                        return {
                            ...selectedDate,
                            max: { ...selectedDate.max,
                                year: ( ( e.target.value === "" || parseInt(e.target.value) <= 0 || isNaN(e.target.value) ) ? "0" : parseInt(e.target.value) )
                            }
                        }
                    });
                }}>
                </input>

                <input type="number" value={ selectedDate.max.month }
                    onChange={ e => { setSelectedDate(() => {
                        return {
                            ...selectedDate,
                            max: { ...selectedDate.max,
                                month: ( ( e.target.value === "" || parseInt(e.target.value) <= 0 || isNaN(e.target.value) ) ? "0" : parseInt(e.target.value) )
                            }
                        }
                    });
                }}>
                </input>

                <input type="number" value={ selectedDate.max.day }
                    onChange={ e => { setSelectedDate(() => {
                        return {
                            ...selectedDate,
                            max: { ...selectedDate.max,
                                day: ( ( e.target.value === "" || parseInt(e.target.value) <= 0 || isNaN(e.target.value) ) ? "0" : parseInt(e.target.value) )
                            }
                        }
                    });
                }}>
                </input>
            </div>
        </div>
    );
}
 
export default DateFilter;