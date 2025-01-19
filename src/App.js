import React from 'react';
import './App.css';
import ServiceSearch from './components/ServiceSearch';
import '@fontsource/fira-sans-extra-condensed';

function App() {
  return (
    <div className="App">
      <h1>Service Finder</h1>
      <ServiceSearch />
    </div>
  );
}

export default App;
