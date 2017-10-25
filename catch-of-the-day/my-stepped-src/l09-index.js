import React from 'react';
import { render } from 'react-dom'; /* we don't need whole reactDOM */
import { BrowserRouter, Match, Miss } from 'react-router';

// Webpack will compile all styles & insert them to <head> of index.html
import './css/style.css';

import App from './components/App';
import NotFound from './components/NotFound';
import StorePicker from './components/StorePicker';



const Root = () => {
  return (
    <BrowserRouter>
      {/* <Match/> can't be a child of Browser */}
      <div>
        <Match exactly pattern="/" component={StorePicker} />
        <Match exactly pattern="/store/:storeId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}


// (whatToRender, where)
render(<Root/>, document.querySelector('#main'));