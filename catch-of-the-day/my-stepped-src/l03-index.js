import React from 'react';
import { render } from 'react-dom'; /* we don't need whole reactDOM */

import StorePicker from './components/StorePicker';

// (whatToRender, where)
render(<StorePicker/>, document.querySelector('#main'));