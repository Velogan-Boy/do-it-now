import React from 'react';

import { Toaster } from 'react-hot-toast';

import './App.css';
import Button from './components/Button/Button';

function App() {
   return (
      <div className="App">
         <Toaster/> 
         <header className="App-header">
            <h1> Do-It-Now! </h1>
            <Button>Add Task</Button>
         </header>
      </div>
   );
}

export default App;

