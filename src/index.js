import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import store from './store/index'
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0 auto;
    width: 70%;
    padding: 10px;
  }
  *{
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }
`
window.store = store

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
      <GlobalStyle>
      </GlobalStyle>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
