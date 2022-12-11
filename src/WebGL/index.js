import React, { Component } from "react";
import init from "./Init";
import Update from "./Update";

export default class WebGL extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      width: this.props.width,
      height: this.props.height,
    };
  }
  componentDidMount() {
    init("#webgl");
  }
  componentDidUpdate() {
    if (
      this.props.width !== this.state.width ||
      this.props.height !== this.state.height
    ) {
      // this.setState({ width: this.props.width, height: this.props.height });
      init("#webgl");
    }
    Update();
  }
  render() {
    return (
      <div
        style={{
          width: 500,
          height: 400,
          overflowY: "auto",
          alignSelf: "center",
        }}
      >
        <canvas
          id="webgl"
          width={this.state.width}
          height={this.state.height}
          style={{
            overflowY: "auto",
          }}
        />
      </div>
    );
  }
}
