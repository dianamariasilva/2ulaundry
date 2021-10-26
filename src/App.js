import './App.css';
import React from 'react';
import './firebase';

import Links from './components/Links';
import LinksPendientes from './components/LinksPendientes';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

function AppLinks() {
  return (
    <React.Fragment>
      <div className="container p-4">
        <div className="row">
          <Links/>
        </div>
        <ToastContainer/>
      </div>
    </React.Fragment>
    );
}
function AppLinksPendientes() {
  return (
    <React.Fragment>
      <div className="container p-4">
        <div className="row">
          <LinksPendientes/>
        </div>
        <ToastContainer/>
      </div>
    </React.Fragment>
    );
}
function App() {
  return (
    <Router>
      <div className="App">
          <Route exact path="/" component={AppLinks} />
          <Route exact path="/user2" component={AppLinksPendientes} />
      </div>
    </Router>
  );
}

export default App;