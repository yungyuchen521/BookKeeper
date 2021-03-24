import { getNextID } from "../utilities.js";

const localTransactions = localStorage.getItem("transactions");

const initState = (localTransactions) ? JSON.parse(localTransactions) : [
    {
        id: "1",
        categoryID: "1",
        amount: 80,
        details: "dinner",
        date: {
            year: 2021,
            month: 2,
            day: 8
        },
        dateAdded: {
            year: 2021,
            month: 2,
            day: 12
        }
    },
    {
        id: "2",
        categoryID: "4",
        amount: 30,
        details: "subway",
        date: {
            year: 2021,
            month: 2,
            day: 8
        },
        dateAdded: {
            year: 2021,
            month: 2,
            day: 8
        }
    },
    {
        id: "3", 
        categoryID: "0",
        amount: 32000,
        details: "February",
        date: {
            year: 2021,
            month: 2,
            day: 28
        },
        dateAdded: {
            year: 2021,
            month: 3,
            day: 1
        }
    },
    {
        categoryID: "1",
        amount: "80",
        details: "dinner",
        id: "4",
        date: {
            year: 2021,
            month: 2,
            day: 9
        },
        dateAdded: {
            year: 2021,
            month: 2,
            day: 4
        }
    },
    {
        categoryID: "0",
        amount: "34000",
        details: "January",
        id: "5",
        date: {
            year: 2021,
            month: 1,
            day: 31
        },
        dateAdded: {
            year: 2021,
            month: 2,
            day: 5
        }
    },
    {
        categoryID: "5",
        amount: "200",
        details: "Books",
        id: "6",
        date: {
            year: 2021,
            month: 2,
            day: 10
        },
        dateAdded: {
            year: 2021,
            month: 2,
            day: 8
        }
    },
    {
        categoryID: "2",
        amount: "1200",
        details: "clothes",
        id: "7",
        date: {
            year: 2021,
            month: 2,
            day: 10
        },
        dateAdded: {
            year: 2021,
            month: 2,
            day: 10
        }
    },
    {
        categoryID: "6",
        amount: "210",
        details: "movie",
        id: "8",
        date: {
            year: 2021,
            month: 2,
            day: 15
        },
        dateAdded: {
            year: 2021,
            month: 2,
            day: 18
        }
    },
    {
        categoryID: "6",
        amount: "60",
        details: "pocket ball",
        id: "9",
        date: {
            year: 2021,
            month: 2,
            day: 18
        },
        dateAdded: {
            year: 2021,
            month: 2,
            day: 17
        }
    },
    {
        categoryID: "1",
        amount: "80",
        details: "dinner",
        id: "10",
        date: {
            year: 2021,
            month: 2,
            day: 18
        },
        dateAdded: {
            year: 2021,
            month: 2,
            day: 17
        }
    },
    {
        categoryID: "3",
        amount: 80,
        details: "detergent",
        id: "11",
        date: {
            year: 2021,
            month: 2,
            day: 25
        },
        dateAdded: {
            year: 2021,
            month: 2,
            day: 25
        }
    },
    {
        categoryID: "7",
        amount: 40,
        details: "swimming pool",
        id: "12",
        date: {
            year: 2021,
            month: 3,
            day: 5
        },
        dateAdded: {
            year: 2021,
            month: 3,
            day: 10
        }
    }
]

const TransactionReducer = (state = initState, action) => {
    var newTransactions = null;

    switch (action.type) {
        case "ADD_TRANSACTION":
            action.transaction.id = getNextID(state);
            newTransactions = [...state].concat(action.transaction);
            localStorage.setItem("transactions", JSON.stringify(newTransactions));
            return newTransactions;
            
        case "DELETE_TRANSACTION":
            newTransactions = [...state].filter(entry => entry.id !== action.transaction.id);
            localStorage.setItem("transactions", JSON.stringify(newTransactions));
            return newTransactions;
                
        case "EDIT_TRANSACTION":
            newTransactions = state.map( entry => (entry.id === action.newTransaction.id) ? action.newTransaction : entry );
            localStorage.setItem("transactions", JSON.stringify(newTransactions));
            return newTransactions;
        
        case "DELETE_CATEGORY":
            newTransactions = [...state].filter(entry => entry.categoryID !== action.id);
            localStorage.setItem("transactions", JSON.stringify(newTransactions));
            return newTransactions;
        
        default:
            return state;
    }
}

export default TransactionReducer;