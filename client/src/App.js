import React from 'react';
import './App.css';
import BooksList from "./components/BooksList";
import AddBook from "./components/AddBook";


function App() {
  return (
    <div>
      <h1> Hello React! </h1>
      <BooksList />
    </div>
  );
}

export default App;
