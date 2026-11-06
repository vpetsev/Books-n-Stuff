import React, { useState } from 'react';
import './App.css';
import BooksList from "../BooksList/BooksList";
import FilterBooks from "../FilterBooks/FilterBooks";


function App() {
  const [genre, setGenre] = useState('');
  return (
    <div>
      <h1> Hello React! </h1>
      <FilterBooks genre={genre} onFilter={setGenre} />
      <BooksList genre={genre} />
    </div>
  );
}

export default App;
