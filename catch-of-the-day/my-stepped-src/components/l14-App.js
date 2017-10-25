import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  constructor() {
    super(); /* init React.Component */
    this.addFish = this.addFish.bind(this); /* bind CUSTOM method */
    this.loadSamples = this.loadSamples.bind(this);

    // initial state or getInitialState() when using React.createClass (ES5)
    this.state = {
      fishes: {},
      order: {}
    };
  }

  addFish(fish) {
    const fishes = {...this.state.fishes}; /* get copy of state */
    // Add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;

    // Set state
    this.setState({ fishes });
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
        </div>
        <Order />
        {/* Pass parent method down as prop */}
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

// Allows other js-files to import App component
export default App;