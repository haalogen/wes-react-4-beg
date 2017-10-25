import React from 'react';
import { render } from 'react-dom'; /* we don't need whole reactDOM */
// Webpack will compile all styles & insert them to <head> of index.html
import './css/style.css';

import StorePicker from './components/StorePicker';
import App from './components/App';
import Header from './components/Header';

// (whatToRender, where)
render(<App/>, document.querySelector('#main'));