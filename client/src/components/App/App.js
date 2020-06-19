import React from 'react';
import './App.css';
import BooksList from "../BooksList/BooksList";
import FilterBooks from "../FilterBooks/FilterBooks";


function App() {
  return (
    <div>
      <h1> Hello React! </h1>
      <FilterBooks />
      <BooksList />
    </div>
  );
}

export default App;
