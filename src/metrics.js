import React from "react";

class Metrics extends React.Component {
  render() {
    return (
      <ul className="list-group">
        <li className="list-group-item">{`X: ${this.props.rX}`}</li>
        <li className="list-group-item">{`Y: ${this.props.rY}`}</li>
        <li className="list-group-item">{`W: ${this.props.rW}`}</li>
        <li className="list-group-item">{`H: ${this.props.rH}`}</li>
      </ul>
    );
  }
}

export default Metrics;
