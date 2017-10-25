import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super(); /* init React.Component */
    this.addFish = this.addFish.bind(this); /* bind CUSTOM method */
    this.updateFish = this.updateFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    // initial state or getInitialState() when using React.createClass (ES5)
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount() { /* This runs right before <App> is rendered */
    // Bind syncing of state to Firebase DB
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    // Check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(
      `order-${this.props.params.storeId}`
    );

    if (localStorageRef) {
      // Update App component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref); /* Unbind syncing state with Firebase */
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order));
  }

  addFish(fish) {
    const fishes = {...this.state.fishes}; /* Get copy of state */
    // Add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;

    // Set state
    this.setState({ fishes }); /* ES6: Object Property Shorthand */
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes}; /* Take a copy of state */
    fishes[key] = updatedFish; /* Update the copy */
    this.setState({ fishes });
  }

  addToOrder(key) {
    const order = {...this.state.order}; /* Take a copy of state */
    // Update or add new number of fish ordered
    order[key] = order[key] ? order[key] + 1 : 1;
    // Update state
    this.setState({ order });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          {/* Props (for passing data)  -- like attrs in HTML */}
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            { /* Loop over fishes & make a list of Fish components */
              Object
                .keys(this.state.fishes) /* Gives array of keys from object */
                .map(key =>
                  <Fish key={key} index={key}
                    details={this.state.fishes[key]}
                    addToOrder={this.addToOrder}
                  />
                ) /* `Key` isn't for us, but for React.
                     So we pass key VALUE explicitly in `index` prop*/
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
        />
        {/* Pass parent method down as prop */}
        <Inventory
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          updateFish={this.updateFish}
          fishes={this.state.fishes}
        />
      </div>
    )
  }
}

// Allows other js-files to import App component
export default App;