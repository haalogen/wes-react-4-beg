import Rebase from 're-base';

// Base -- connection to Firebase DB
const base = Rebase.createClass({
  apiKey: "AIzaSyAd-jm0_e43kMrmanrJ1smq4po46Yn_IPc",
  authDomain: "catch-of-the-day-stan.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-stan.firebaseio.com"
});

export default base;