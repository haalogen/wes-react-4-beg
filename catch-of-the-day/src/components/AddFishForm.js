import React from 'react';

class AddFishForm extends React.Component {
  createFish(event) {
    event.preventDefault();
    console.log('Create New Fish! 🐠');

    const fish = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    };

    this.props.addFish(fish);
    this.fishForm.reset(); /* Clear form */
  }

  render() {
    return (
      <form
        className="fish-edit"
        ref={ (input) => this.fishForm = input }
        onSubmit={ (e) => this.createFish(e) }
      >
        <input
          type="text"
          placeholder="Fish Name"
          ref={ (input) => this.name = input }
        />
        <input
          type="text"
          placeholder="Fish Price"
          ref={ (input) => this.price = input }
        />

        <select ref={ (input) => this.status = input }>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea
          placeholder="Fish Desc"
          ref={ (input) => this.desc = input }
          rows="5"
        ></textarea>

        <input
          type="text"
          placeholder="Fish Image"
          ref={ (input) => this.image = input }
        />

        <button type="submit">+ Add Item</button>
      </form>
    )
  }
}

AddFishForm.propTypes = {
  addFish: React.PropTypes.func.isRequired
}

export default AddFishForm;