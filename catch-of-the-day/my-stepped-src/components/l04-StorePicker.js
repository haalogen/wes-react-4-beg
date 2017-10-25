import React from 'react';

// Basic component
class StorePicker extends React.Component {
  // Method
  render() {
    // Can only return ONE parent element
    return(
      <form className="store-selector">
        {/* Legit comment inside of JSX */}
        <h2>Please Enter A Store</h2>
        <input type="text" placeholder="Store Name" required />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}


// Allows other js-files to import StorePicker
export default StorePicker;