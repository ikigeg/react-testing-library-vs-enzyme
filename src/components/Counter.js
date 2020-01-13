import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Counter.css';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.addIfOdd = this.addIfOdd.bind(this);
  }

  add() {
    this.setState({ value: this.state.value + 1 }, () => {
      if (this.state.value >= 5) {
        this.props.limitWarning();
      }
    });
  }

  remove() {
    this.setState({ value: this.state.value - 1 });
  }

  addIfOdd() {
    if (this.state.value % 2 !== 0) {
      this.setState({ value: this.state.value + 1 });
    }
  }

  render() {
    const { value } = this.state;

    return (
      <>
        <p>
          Clicked: {value} times
        </p>
        <div>
          <button type="button" onClick={this.add}>Add</button>

          <button type="button" onClick={this.remove}>Remove</button>

          <button type="button" onClick={this.addIfOdd}>
            Add if odd
          </button>
        </div>
      </>
    )
  }
}

Counter.propTypes = {
  limitWarning: PropTypes.func,
}

Counter.defaultProps = {
  limitWarning: () => {},
}

export default Counter