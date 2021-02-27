//hello test
import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QuoteHistory from "./Pages/QuoteHistory/index";
import ProfileManagement from "./Pages/ProfileManagement/index";
import QuoteForm from "./Pages/QuoteForm/index";
import LoginScreen from "./Pages/Login/index";

function App() {
  return (
    <>
      <Router >
        <Switch>
          <Route path='/' exact component={QuoteHistory} />
          <Route path='/profile' exact component={ProfileManagement} />
          <Route path='/request-quote' exact component={QuoteForm} />
          <Route path='/login' exact component={LoginScreen} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
