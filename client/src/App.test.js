import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App/App';
import reducer from './store/reducers/books';

const books = [
  { id: 1, title: 'First book', genre: 'Fiction', publisher: 'Writer', year: 2020 },
  { id: 2, title: 'Second book', genre: 'History', publisher: 'Writer', year: 2021 }
];

test('selecting a genre filters the list and All genres restores it', async () => {
  const originalFetch = global.fetch;
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(books) }));
  try {
    const store = createStore(reducer, applyMiddleware(thunk));
    const { findByText, getByText, getAllByText, queryByText } = render(<Provider store={store}><App /></Provider>);
    await findByText('First book');
    fireEvent.click(getByText('Filter'));
    fireEvent.click(getAllByText('Fiction').find(element => element.getAttribute('role') === 'button'));
    expect(queryByText('Second book')).toBeNull();
    fireEvent.click(getAllByText('Fiction').find(element => element.tagName === 'BUTTON'));
    fireEvent.click(getByText('All genres'));
    expect(getByText('Second book')).toBeTruthy();
  } finally { global.fetch = originalFetch; }
});
