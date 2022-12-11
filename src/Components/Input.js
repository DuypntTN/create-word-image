import React, { Component } from "react";
import styled from "styled-components";

export default class Input extends Component {
  CustomeInput = styled.input`
    width: 100%;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px 16px;
    margin: 8px 0;
    box-sizing: border-box;
    &:hover {
      border: 1px solid #555;
      cursor: pointer;
    }
    outline: none;
    font-size: 16px;
    font-family: "Segoe UI";
  `;
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <this.CustomeInput
          type={this.props.type}
          value={this.state.value}
          {...this.props}
          onChange={(e) => {
            this.props.onChange(e.target.value);
          }}
        />
      </div>
    );
  }
}
