import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// PAGES
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';

import './App.css';

function App() {
   return (
      <div className="App">
         <Toaster />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth/>}/>
            <Route path="*" element={<h1>404</h1>} />
         </Routes>
      </div>
   );
}

export default App;

