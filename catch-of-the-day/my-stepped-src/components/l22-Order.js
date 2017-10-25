import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>
      &times;</button>;

    if (!fish || fish.status === 'unavailable') {
      // Show in order if some fish is no longer available
      return (
        <li key={key}>
          Sorry, {fish ? fish.name : 'fish'} is no longer available!
          {removeButton}
        </li>
      )
    }

    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}</span>
          </CSSTransitionGroup>
          lbs {fish.name}{removeButton}
        </span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order);

    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      // Fish can be removed from menu or sold out any time
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        // `|| 0` because fish can be deleted from order
        return prevTotal + (count * fish.price || 0);
      }
      return prevTotal;
    }, 0); /* init value of `prevTotal` is 0 */

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>

        {/*
          ``` component="ul" ``` means still be <ul> in HTML
          ``` transitionName="order" ``` -- for CSS class-naming
        */}
        <CSSTransitionGroup
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>

      </div>
    )
  }
}

export default Order;