import React, { Component } from 'react';

const GuardFactory = (first,second) => (props) => {
  console.log(first);
  console.log(second);
  console.log(this);
  return (
    class Guard extends Component {
      render () {
        console.log(this.props.params);
        return (
          <h1>
            test
          </h1>
        )
      }
    }
  )
}

export default GuardFactory;

