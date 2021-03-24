import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from "./Home/Home";
import Categories from "./Categories/Categories.js";
import AddCategory from "./Categories/Add Category.js";
import Navbar from "./Navbar.js";
import Transactions from "./Transactions/Transactions.js";
import AddTransaction from "./Transactions/Add Transaction.js";

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="app-title background-color1">BookKeeper</h1>
        <Navbar/>
  
        <div className="content">
          <Switch>
            
            <Route exact path="/"><Home/></Route>
  
            <Route exact path="/categories"><Categories/></Route>

            <Route exact path="/addCategory"><AddCategory/></Route>
  
            <Route exact path="/transactions"><Transactions/></Route>
  
            <Route exact path="/addTransaction"><AddTransaction /></Route>
  
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
