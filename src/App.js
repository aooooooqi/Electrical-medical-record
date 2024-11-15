// App.js
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';        
import Login from './Pages/Login';
import Client_detail from './Pages/Client_detail';
import Session_details from './Pages/Session_details';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Client_detail" element={<Client_detail />} />
        <Route path="/Clients" element={<Session_details />} />
      </Routes>
    </Router>
  );
}

export default App;
