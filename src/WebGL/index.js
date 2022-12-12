import React, { Component, useEffect } from "react";
import { Label } from "../App";
import Init from "./Init";
import init from "./Init";
import Update from "./Update";

const WebGL = ({ width = 0, height = 0 }) => {
  useEffect(() => {
    Init("#webgl");
  }, []);
  return (
    <div
      style={{
        width: 500,
        height: 'auto',
        overflowY: "auto",
        alignSelf: "center",
      }}
    >
      <Label>Kết quả</Label>
      <canvas
        id="webgl"
        width={width}
        height={height}
        style={{
          border: "1px solid red",
        }}
      />
    </div>
  );
};

export default WebGL;
