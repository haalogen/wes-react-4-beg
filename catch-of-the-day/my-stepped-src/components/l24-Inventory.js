import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount(){
    // Listen for authentication, auto-authentificate when refreshed
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, { user })
      };
    });
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
        <input
          type="text"
          name="name"
          value={fish.name}
          placeholder="Fish Name"
          onChange={(e) => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="price"
          value={fish.price}
          placeholder="Fish Price"
          onChange={(e) => this.handleChange(e, key)}
        />

        <select
          name="status"
          value={fish.status}
          placeholder="Fish Status"
          onChange={(e) => this.handleChange(e, key)}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea
          name="desc"
          value={fish.desc}
          placeholder="Fish Desc"
          rows="5"
          onChange={(e) => this.handleChange(e, key)}
        ></textarea>

        <input
          type="text"
          name="image"
          value={fish.image}
          placeholder="Fish Image"
          onChange={(e) => this.handleChange(e, key)}
        />

        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }


  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({ uid: null });
  }

  authHandler(error, authData) {
    console.log(authData);
    if (error) {
      console.log(error);
      return;
    }

    // Grab the store info (directly from Firebase)
    const storeRef = base.database().ref(this.props.storeId);

    // Query the Firebase ONCE for the store data
    // `snapshot` -- Firebase "all-the-data object"
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // Claim store as our own if there is no owner already
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid /* unique id from Github/Facebook/Twitter */
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    });
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>

        <button className="github" onClick={() => this.authenticate('github')}>
          Log In with Github
        </button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>
          Log In with Facebook
        </button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>
          Log In with Twitter
        </button>
      </nav>
    )
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;

    // Check if they are logged in at all
    if (!this.state.uid) { /* `uid` means "User ID" */
      return <div>{this.renderLogin()}</div>
    }

    // Check if they are the owner of the current store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you aren't the owner of this store!</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <p>Inventory</p>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load sample fishes</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  addFish: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
}

export default Inventory;