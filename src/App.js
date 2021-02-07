//hello test
import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QuoteHistory from "./Pages/QuoteHistory/index";
import ProfileManagement from "./Pages/ProfileManagement/index";
import QuoteForm from "./Pages/QuoteForm/index";

function App() {
  return (
    <>
 Navbar
      <Router >
        <Switch>
          <Route path='/' exact component={QuoteHistory} />
          <Route path='/profile' exact component={ProfileManagement} />
          <Route path='/request-quote' exact component={QuoteForm} />
        </Switch>
      </Router>

      <h1>Fueling my feelings</h1>
 main
    </>
  );
}

export default App;
