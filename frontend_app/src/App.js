import logo from './logo.svg';
import './App.css';
import React, { useState, createContext } from "react"
import Singup from "./SignUp.js"
import Singin from "./Signin.js"
import DashbordAdd from "./DashboardAdd.js"
import DashbordContent from "./DashboardContent"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import GlobalContext from "./GlobalContext.js"

function App() {

  const [context, setContext] = useState(null)
  return (
    <div>
      <GlobalContext.Provider value={{ context, setContext }}>
        <Router>
          <Switch>
            <Route path='/singin' component={Singin} />
            <Route path='/singup' component={Singup} />
            <Route path='/home' component={DashbordContent} />
            <Route path='/add' component={DashbordAdd} />
          </Switch>
          <Redirect to="/singin" />
        </Router>
      </GlobalContext.Provider>
    </div>
  );
}


export default App;
