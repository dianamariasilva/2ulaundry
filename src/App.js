import './App.css';
import React from 'react';
import './firebase';

import Links from './components/Links';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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

export default App;
