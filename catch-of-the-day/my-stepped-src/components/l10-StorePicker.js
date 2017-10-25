import React from 'react';
import { getFunName } from '../helpers';

// Basic component
class StorePicker extends React.Component {
  // Method
  render() {
    // Can only return ONE parent element
    return(
      <form className="store-selector">
        {/* Legit comment inside of JSX */}
        <h2>Please Enter A Store 🐟</h2>
        <input type="text" required placeholder="Store Name"
          defaultValue={getFunName()} />

        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

// Allows other js-files to import StorePicker component
export default StorePicker;