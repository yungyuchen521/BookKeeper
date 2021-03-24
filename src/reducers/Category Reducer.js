import { getNextID } from "../utilities.js";

const localCategories = localStorage.getItem("categories");

const initState = localCategories ? JSON.parse(localCategories) : [
  {
    id: "0",
    type: "income",
    name: "salary",
    total: 66000,
    color: "#64E664"
  },
  {
    id: "1",
    type: "expense",
    name: "food",
    total: 240,
    color: "#ffa500"
  },
  {
    id: "2",
    type: "expense",
    name: "shopping",
    total: 1200,
    color: "#4b0082"
  },
  {
    id: "3",
    type: "expense",
    name: "household",
    total: 80,
    color: "#dc143c"
  },
  {
    id: "4",
    type: "expense",
    name: "transport",
    total: 30,
    color: "#0000ff"
  },
  {
    id: "5",
    type: "expense",
    name: "education",
    total: 200,
    color: "#429222"
  },
  {
    id: "6",
    type: "expense",
    name: "entertainment",
    total: 270,
    color: "#ffd700"
  },
  {
    id: "7",
    type: "expense",
    name: "sport",
    total: 40,
    color: "#2F4F4F"
  },
  {
    id: "8",
    type: "expense",
    name: "others",
    total: 0,
    color: "#000000"
  },
  {
    id: "9",
    type: "income",
    name: "insurance",
    total: 0,
    color: "#649664"
  },
  {
    id: "10",
    type: "income",
    name: "investment",
    total: 0,
    color: "#c8e664"
  },
  {
    id: "11",
    type: "income",
    name: "bonus",
    total: 0,
    color: "#ff0000"
  }
]

const CategoryReducer = (state = initState, action) => {
    var newCategories = null;

    switch (action.type) {
        case "ADD_TRANSACTION":
            newCategories = state.map( category => {
              if (category.id === action.transaction.categoryID) {
                  const cat = category;
                  cat.total = parseInt(cat.total) + parseInt(action.transaction.amount);
                  return (cat);
              }
              else {
                  return category;
              }
          } );

          localStorage.setItem("categories", JSON.stringify(newCategories));
          
          return newCategories;

        case "DELETE_TRANSACTION":
            newCategories = state.map( category => {
                if (category.id === action.transaction.categoryID) {
                    const cat = category;
                    cat.total = parseInt(cat.total) - parseInt(action.transaction.amount);
                    return (cat);
                }
                else {
                    return category;
                }
            } );

            localStorage.setItem("categories", JSON.stringify(newCategories));

            return newCategories;

        case "EDIT_TRANSACTION":
            newCategories = state.map( category => {
                if (category.id === action.oldTransaction.categoryID && category.id === action.newTransaction.categoryID) {
                    const cat = category;
                    cat.total = parseInt(cat.total) - parseInt(action.oldTransaction.amount) + parseInt(action.newTransaction.amount);
                    return (cat);
                }

                else if (category.id === action.oldTransaction.categoryID) {
                    const cat = category;
                    cat.total = parseInt(cat.total) - parseInt(action.oldTransaction.amount);
                    return (cat);
                }
                
                else if (category.id === action.newTransaction.categoryID) {
                    const cat = category;
                    cat.total = parseInt(cat.total) + parseInt(action.newTransaction.amount);
                    return (cat);
                }

                else {
                    return category;
                }
            } );

            localStorage.setItem("categories", JSON.stringify(newCategories));

            return newCategories;

        case "ADD_CATEGORY":
            action.category.id = getNextID(state);
            newCategories = [...state].concat(action.category);

            localStorage.setItem("categories", JSON.stringify(newCategories));

            return newCategories;

        case "DELETE_CATEGORY":
            newCategories = [...state].filter(entry => entry.id !== action.id);
            localStorage.setItem("categories", JSON.stringify(newCategories));
            return newCategories;
    
        case "EDIT_CATEGORY":
            newCategories = state.map( category => ( category.id === action.category.id ) ? action.category : category );
            localStorage.setItem("categories", JSON.stringify(newCategories));
            return newCategories;

        default:
            return state;
    }
}

export default CategoryReducer;