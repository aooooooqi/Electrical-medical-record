// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';           // 自动查找 Home 文件夹中的 index.jsx
import Login from './Pages/Login';
import Client_detail from './Pages/Client_detail';
import Session_details from './Pages/Session_details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Client_detail" element={<Client_detail />} />
        <Route path="/Session_details" element={<Session_details />} />
      </Routes>
    </Router>
  );
}

export default App;
