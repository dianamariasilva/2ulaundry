import './App.css';
import React from 'react';
import './firebase';

import Links from './components/Links';
import LinkForm from './components/LinkForm';

function App() {
  return (
    <React.Fragment>
      <div className="container p-4">
        <div className="row">
          <Links/>
        </div>
        <LinkForm/>
      </div>
    </React.Fragment>
    );
}

export default App;
