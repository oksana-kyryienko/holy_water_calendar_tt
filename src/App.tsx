import React from 'react';
import { Calendar } from './components/Calendar/Calendar';
import './App.css';

function App() {
  return (
    <div>
      <Calendar date={new Date()} />
    </div>
  );
}

export default App;

