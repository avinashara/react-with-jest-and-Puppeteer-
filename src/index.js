
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './feature/stores/store';
import App from './App';

let eleRef = document.getElementById('jp-search-root');
if (eleRef) {
    ReactDOM.render(<Provider store={store}><App /></Provider>, eleRef);
}