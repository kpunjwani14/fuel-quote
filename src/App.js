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
<<<<<<< HEAD
          <Route path='/' exact component={QuoteHistory} />
          <Route path='/profile' exact component={ProfileManagement} />
          <Route path='/request-quote' exact component={QuoteForm} />
          <Route path='/request-quote' exact component={QuoteHistory} />
          <Route path='/login' exact component={LoginScreen} />
=======
          <Route path='/history/:id' exact component={QuoteHistory} />
          <Route path='/profile/:id' exact component={ProfileManagement} />
          <Route path='/request-quote/:id' exact component={QuoteForm} />
          <Route path='/'  component={LoginScreen} />
>>>>>>> 02dd701a5de7b75008e6c9051d4d2f0b4435cdb6
        </Switch>
      </Router>
    </>
  );
}

export default App;
