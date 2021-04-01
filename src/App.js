//hello test
import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QuoteHistory from "./Pages/QuoteHistory/index";
import ProfileManagement from "./Pages/ProfileManagement/index";
import QuoteForm from "./Pages/QuoteForm/index";
import LoginScreen from "./Pages/Login/index";
import Notifications, { notify } from 'react-notify-toast';

function App() {
  return (
    <>
      <Notifications />
      <Router >
        <Switch>
          <Route path='/history/:id' exact component={QuoteHistory} />
          <Route path='/profile/:id' exact component={ProfileManagement} />
          <Route path='/request-quote/:id' exact component={QuoteForm} />
          <Route path='/' component={LoginScreen} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
