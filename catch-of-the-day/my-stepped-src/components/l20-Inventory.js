import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // Take a copy of that fish & update it with the new data
    // const updatedFish = Object.assign({}, fish); /* Copy: the 1st way */
    // The 2nd way: copy & overlay updated field of `fish`
    const updatedFish = {
      ...fish,
       // Overlay with a computed property (ES6)
       // `event.target` gives DOM element-target of event
      [e.target.name]: e.target.value
    };

    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        {/* React demands KEY so that all elements are unique */}
        <input type="text" name="name" value={fish.name} placeholder="Fish Name"
          onChange={(e) => this.handleChange(e, key)}
        />
        <input type="text" name="price" value={fish.price} placeholder="Fish Price"
          onChange={(e) => this.handleChange(e, key)}
        />

        <select name="status" value={fish.status} placeholder="Fish Status"
          onChange={(e) => this.handleChange(e, key)}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea name="desc" value={fish.desc}
          placeholder="Fish Desc" rows="5"
          onChange={(e) => this.handleChange(e, key)}
        >
        </textarea>

        <input type="text" name="image" value={fish.image} placeholder="Fish Image"
          onChange={(e) => this.handleChange(e, key)}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <p>Inventory</p>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load sample fishes</button>
      </div>
    )
  }
}

export default Inventory;