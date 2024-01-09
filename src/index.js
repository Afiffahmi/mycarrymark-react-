import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import JoyOrderDashboardTemplate from './App.tsx';
import {store} from './redux/store';
import {Provider} from 'react-redux';
import SignUp from './SignUp.tsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
  <Routes>
    <Route path="/" element={<JoyOrderDashboardTemplate/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="*" element={<h1>Not Found</h1>}/>
  </Routes>
  </Provider>
  </BrowserRouter>
);
reportWebVitals();
