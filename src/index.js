import React from "react";
import ReactDOM from "react-dom";
import Metrics from "./metrics";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

class App extends React.Component {
  state = {
    X: 0,
    Y: 0,
    iX: 0,
    iY: 0,
    rX: 0,
    rY: 0,
    rW: 0,
    rH: 0,
    mouseDown: false
  };

  getMousePositionOnCanvas = event => {
    const rect = this.refs.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  onMouseMove = event => {
    const pos = this.getMousePositionOnCanvas(event);
    this.setState({
      X: pos.x,
      Y: pos.y,
      iX: this.state.iX,
      iY: this.state.iY,
      rX: Math.min(this.state.iX, pos.x),
      rY: Math.min(this.state.iY, pos.y),
      rW: this.state.iX ? Math.abs(this.state.iX - pos.x) : 0,
      rH: this.state.iY ? Math.abs(this.state.iY - pos.y) : 0
    });

    if (this.state.mouseDown) {
      this.drawOutlineRectangle();
    }
  };

  onMouseOut = event => {
    this.setState({ X: 0, Y: 0, iX: 0, iY: 0, rX: 0, rY: 0, rW: 0, rH: 0 });
  };

  startDraw = event => {
    const pos = this.getMousePositionOnCanvas(event);
    this.setState({
      X: pos.x,
      Y: pos.y,
      iX: pos.x,
      iY: pos.y,
      rX: 0,
      rY: 0,
      rW: 0,
      rH: 0,
      mouseDown: true
    });
  };

  endDraw = event => {
    if (this.state.iX && this.state.iY) {
      this.setState({ mouseDown: false });
      this.drawRectangle();
    }
  };

  drawRectangle = () => {
    const context = this.refs.canvas.getContext("2d");
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    context.beginPath();
    context.lineWidth = "4";
    context.strokeStyle = "blue";
    context.setLineDash([]);
    context.rect(this.state.rX, this.state.rY, this.state.rW, this.state.rH);
    context.stroke();
  };

  drawOutlineRectangle = () => {
    const context = this.refs.canvas.getContext("2d");
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    context.beginPath();
    context.lineWidth = "1";
    context.strokeStyle = "grey";
    context.setLineDash([5, 3]);
    context.rect(this.state.rX, this.state.rY, this.state.rW, this.state.rH);
    context.stroke();
  };

  resetCanvas = event => {
    this.setState({ X: 0, Y: 0, iX: 0, iY: 0, rX: 0, rY: 0, rW: 0, rH: 0 });
    const context = this.refs.canvas.getContext("2d");
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    context.beginPath();
  };

  render() {
    return (
      <div class="container">
        <canvas
          id="reactCanvas"
          width="500"
          height="400"
          ref="canvas"
          onMouseMove={this.onMouseMove}
          onMouseDown={this.startDraw}
          onMouseUp={this.endDraw}
          onMouseOut={this.onMouseOut}
        />
        <button
          type="button"
          class="btn btn-primary"
          onClick={this.resetCanvas}
        >
          Reset
        </button>
        {this.state.rW ? <Metrics {...this.state} /> : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
