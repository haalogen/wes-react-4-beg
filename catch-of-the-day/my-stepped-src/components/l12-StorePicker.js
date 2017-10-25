import React from 'react';
import { getFunName } from '../helpers';

// Basic component
class StorePicker extends React.Component {
  /*
  // ? How to make this === (StorePicker instance) in CUSTOM methods?
  // 1) First way -- bind()-ing to this in constructor():
  constructor() {
    super(); // First create React.Component, and then we extend it
    // Bind our CUSTOM method to StorePicker component
    this.goToStore = this.goToStore.bind(this);
  }
  */

  // Method
  goToStore(event) {
    event.preventDefault(); /* Stop default scenario from happening */
    console.log('You changed the URL!');

    // Grab the text from the box
    const storeId = this.storeInput.value
    console.log(`Going to ${storeId}`);

    // Do transition from / to /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    // Can only return ONE parent element
    return(
      <form className="store-selector" onSubmit={ (e) => this.goToStore(e) }>
        {/* 2) Second way -- bind()-ing in JSX of BUILT-IN render():
                onSubmit={ this.goToStore.bind(this) }
            or
            calling CUSTOM method with this & passing an event
            ( But if there're several StorePickers on the page
            it's a duplication of methods, if it matters -- use first way )
         */}

        <h2>Please Enter A Store 🐟</h2>

        {/* Make a ref to this DOM-element for React.Component */}
        <input type="text" required placeholder="Store Name"
          defaultValue={getFunName()}
          ref={ (input) => this.storeInput = input } />

        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

// We need to surface (всплыть) BrowserRouter from parent
// to our Component (StorePicker)
// in order to use it here for redirection to the store page.
// So, we need to set context for StorePicker.
StorePicker.contextTypes = {
  router: React.PropTypes.object /* Now StorePicker will have router */
}


// Allows other js-files to import StorePicker component
export default StorePicker;