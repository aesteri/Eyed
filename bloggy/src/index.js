import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Helmet } from 'react-helmet'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Helmet>
        <title>Christine Kim</title>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="%PUBLIC_URL%/favicon.ico" sizes="16x16" />
        <meta name='description' content='Personal Website for Christine Kim' />
    </Helmet>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
