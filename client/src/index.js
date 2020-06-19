import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from "redux";
import booksReducer from "./store/reducers/books"
import { Provider } from "react-redux"
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { BaseLayout } from "./components/BaseLayout";
import AddBook from './components/AddBook';
import UpdateBook from "./components/UpdateBook"
import 'bootstrap/dist/css/bootstrap.min.css';



const store = createStore(
  booksReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <BaseLayout>
          <Switch>
            <Route component={App} path="/" exact />
            <Route component={AddBook} path="/add-book" exact />
            <Route component={UpdateBook} path="/update-book" exact />
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
