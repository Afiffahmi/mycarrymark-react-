import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import JoyOrderDashboardTemplate from './App.tsx';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>

    <Route path="/" element={<JoyOrderDashboardTemplate/>}/>

  </Routes>
  </BrowserRouter>
);
reportWebVitals();
