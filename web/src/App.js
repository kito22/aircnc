import React from 'react';
import './App.css';
import logo from './assets/logo.svg';
import Routes from './routes';

function App() {
  return (
    <div className="Container">
      <img src={logo} alt="Aircnc" />
      <Routes />
    </div>
  );
}

export default App;
